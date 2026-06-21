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
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = (event) => {
                console.error('Database failed to open:', event.target.error);
                reject(event.target.error);
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
        });
    }

    async getDb() {
        if (!this.db) {
            await this.initPromise;
        }
        return this.db;
    }

    async savePDF(pdf) {
        const db = await this.getDb();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put(pdf);

            request.onsuccess = () => resolve(true);
            request.onerror = (e) => reject(e.target.error);
        });
    }

    async getAllPDFs() {
        const db = await this.getDb();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result || []);
            request.onerror = (e) => reject(e.target.error);
        });
    }

    async getPDF(id) {
        const db = await this.getDb();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (e) => reject(e.target.error);
        });
    }

    async deletePDF(id) {
        const db = await this.getDb();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(id);

            request.onsuccess = () => resolve(true);
            request.onerror = (e) => reject(e.target.error);
        });
    }
}

// Instantiate and expose the database globally
window.pdfDb = new PDFDatabase();
