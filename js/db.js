/**
 * db.js - IndexedDB wrapper for Matías's platform.
 * Used to store and retrieve PDF files (Blobs) locally.
 */

const DB_NAME = 'MatiasBrandDB';
const DB_VERSION = 1;
const STORE_NAME = 'pdfs';

class PDFDatabase {
    constructor() {
        this.db = null;
        this.initPromise = this.init();
    }

    init() {
        return new Promise((resolve) => {
            if (typeof window === 'undefined' || !window.indexedDB) {
                console.warn('IndexedDB no está soportado en este entorno/navegador.');
                resolve(null);
                return;
            }
            try {
                const request = window.indexedDB.open(DB_NAME, DB_VERSION);

                request.onerror = (event) => {
                    console.warn('No se pudo abrir IndexedDB (probablemente por restricciones de privacidad):', event.target.error);
                    resolve(null); // Resolvemos con null para no romper la app
                };

                request.onsuccess = (event) => {
                    this.db = event.target.result;
                    console.log('Database opened successfully');
                    resolve(this.db);
                };

                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    if (!db.objectStoreNames.contains(STORE_NAME)) {
                        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                        console.log('PDF object store created');
                    }
                };
            } catch (err) {
                console.warn('Error capturado al intentar abrir IndexedDB:', err);
                resolve(null);
            }
        });
    }

    async getDb() {
        if (!this.db) {
            await this.initPromise;
        }
        return this.db;
    }

    async savePDF(pdf) {
        try {
            const db = await this.getDb();
            if (!db) return false;
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([STORE_NAME], 'readwrite');
                const store = transaction.objectStore(STORE_NAME);
                const request = store.put(pdf);

                request.onsuccess = () => resolve(true);
                request.onerror = (e) => reject(e.target.error);
            });
        } catch (e) {
            console.error('Error al guardar PDF localmente:', e);
            return false;
        }
    }

    async getAllPDFs() {
        try {
            const db = await this.getDb();
            if (!db) return [];
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([STORE_NAME], 'readonly');
                const store = transaction.objectStore(STORE_NAME);
                const request = store.getAll();

                request.onsuccess = () => resolve(request.result || []);
                request.onerror = (e) => reject(e.target.error);
            });
        } catch (e) {
            console.error('Error al obtener PDFs locales:', e);
            return [];
        }
    }

    async getPDF(id) {
        try {
            const db = await this.getDb();
            if (!db) return null;
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([STORE_NAME], 'readonly');
                const store = transaction.objectStore(STORE_NAME);
                const request = store.get(id);

                request.onsuccess = () => resolve(request.result);
                request.onerror = (e) => reject(e.target.error);
            });
        } catch (e) {
            console.error('Error al obtener PDF local:', e);
            return null;
        }
    }

    async deletePDF(id) {
        try {
            const db = await this.getDb();
            if (!db) return true;
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([STORE_NAME], 'readwrite');
                const store = transaction.objectStore(STORE_NAME);
                const request = store.delete(id);

                request.onsuccess = () => resolve(true);
                request.onerror = (e) => reject(e.target.error);
            });
        } catch (e) {
            console.error('Error al eliminar PDF local:', e);
            return true;
        }
    }
}

// Instantiate and expose the database globally
window.pdfDb = new PDFDatabase();
