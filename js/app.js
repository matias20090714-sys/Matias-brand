document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // DATA SEEDING (LOCALSTORAGE)
    // ==========================================
    
    // Default mock data for users in localStorage
    const defaultUsers = [
        {
            name: 'Administrador Principal',
            email: 'matias20090714@gmail.com',
            whatsapp: '092707489',
            password: 'PMXL2009',
            role: 'admin',
            status: 'aprobado',
            regDate: new Date().toLocaleDateString('es-ES')
        },
        {
            name: 'Franco Pérez',
            email: 'franco@example.com',
            whatsapp: '091234567',
            password: 'user123',
            role: 'user',
            status: 'aprobado',
            regDate: '18/6/2026'
        },
        {
            name: 'Micaela Silva',
            email: 'micaela@example.com',
            whatsapp: '092345678',
            password: 'user123',
            role: 'user',
            status: 'pendiente',
            regDate: '20/6/2026'
        },
        {
            name: 'Juan Gómez',
            email: 'juan@example.com',
            whatsapp: '093456789',
            password: 'user123',
            role: 'user',
            status: 'rechazado',
            regDate: '19/6/2026'
        }
    ];

    // Seed users database
    if (!localStorage.getItem('matias_users')) {
        localStorage.setItem('matias_users', JSON.stringify(defaultUsers));
    } else {
        // Ensure admin account always exists (even on updates/migrations)
        const existingUsers = getUsers();
        const adminExists = existingUsers.some(u => u.email === 'matias20090714@gmail.com' && u.role === 'admin');
        if (!adminExists) {
            existingUsers.unshift(defaultUsers[0]); // Add admin at top
            saveUsers(existingUsers);
        }
    }

    // Initialize notifications storage
    if (!localStorage.getItem('matias_notifications')) {
        localStorage.setItem('matias_notifications', JSON.stringify([]));
    }

    // Helper functions for database access
    const getUsers = () => JSON.parse(localStorage.getItem('matias_users'));
    const saveUsers = (users) => localStorage.setItem('matias_users', JSON.stringify(users));
    const getNotifications = () => JSON.parse(localStorage.getItem('matias_notifications'));
    const saveNotifications = (notifs) => localStorage.setItem('matias_notifications', JSON.stringify(notifs));
    const getCurrentUser = () => JSON.parse(localStorage.getItem('matias_currentUser') || 'null');
    const setCurrentUser = (user) => localStorage.setItem('matias_currentUser', JSON.stringify(user));
    const removeCurrentUser = () => localStorage.removeItem('matias_currentUser');

    // Initialize Lucide Icons
    const renderIcons = () => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    };
    renderIcons();

    // ==========================================
    // E-BOOK CONTENT DATA (FROM THE ATTACHED PAGES)
    // ==========================================
    const ebookData = {
        id: 'matias_ebook',
        title: 'De Cero a Ingresos Online',
        description: 'La guía completa paso a paso para construir un negocio online rentable desde cero, crear tu marca personal, dominar las ventas y estructurar tu plan de 30 días.',
        fileName: 'De Cero a Ingresos Online - Pablo Xavier.pdf',
        uploadDate: 'Preinstalado',
        isEbook: true,
        author: 'Pablo Xavier',
        chapters: [
            {
                num: '1',
                title: 'Mentalidad y Fundamentos',
                content: `
                    <p class="ebook-para">El éxito en Internet no comienza con una estrategia de marketing ni con una cuenta de TikTok con miles de seguidores. Comienza en tu mente. La mentalidad es el cimiento sobre el que se construye todo lo demás, y sin una base sólida, cualquier estrategia se derrumbará ante la primera dificultad. Este capítulo te ayudará a establecer las expectativas correctas, cultivar la disciplina necesaria y desarrollar las habilidades que te diferenciarán del 95% de las personas que intentan generar ingresos online pero nunca lo consiguen.</p>
                    
                    <p class="ebook-para">Una de las primeras cosas que debes aceptar es que el camino hacia los ingresos online no es lineal. Habrá semanas en las que trabajarás mucho y los resultados tardarán en llegar. Habrá momentos de duda, de frustración e incluso de querer abandonar. Esto es completamente normal y le ocurre a todos los emprendedores digitales, incluidos los que hoy facturan miles de euros al mes. La diferencia entre quienes triunfan y quienes se rinden no es el talento ni la suerte, sino la capacidad de mantenerse constantes cuando los resultados aún no son visibles.</p>
                    
                    <div class="ebook-grid">
                        <div class="ebook-block-card">
                            <h4>Expectativas Reales</h4>
                            <p>Generar ingresos online requiere tiempo, esfuerzo y aprendizaje continuo. No existen fórmulas mágicas ni resultados de la noche a la mañana. Los emprendedores que más rápido progresan son aquellos que aceptan desde el inicio que el proceso lleva meses de trabajo consistente antes de ver resultados significativos. Establecer expectativas realistas te protegerá de la frustración.</p>
                        </div>
                        <div class="ebook-block-card">
                            <h4>Constancia y Disciplina</h4>
                            <p>La motivación es volátil y no puedes depender de ella para construir un negocio. La disciplina, en cambio, es un músculo que se entrena día a día. Establece rutinas claras, define horarios de trabajo y cúmplelos incluso cuando no tengas ganas. La constancia es lo que separa a los profesionales de los aficionados.</p>
                        </div>
                    </div>
                    
                    <div class="ebook-grid">
                        <div class="ebook-block-card">
                            <h4>Desarrollo de Habilidades</h4>
                            <p>El mundo digital evoluciona constantemente. Invierte tiempo en aprender: marketing de contenidos, copywriting, edición de video, análisis de datos e inteligencia artificial. Cada habilidad que adquieras aumenta tu valor en el mercado y te da más herramientas para generar ingresos. Dedica al menos una hora diaria al aprendizaje activo.</p>
                        </div>
                        <div class="ebook-block-card">
                            <h4>Aprender y Aplicar</h4>
                            <p>El conocimiento sin acción no tiene valor. Muchas personas caen en la trampa del "aprendizaje perpetuo": consumen curso tras curso, pero nunca aplican lo aprendido. La fórmula del éxito es simple pero poderosa: aprende un concepto, aplícalo de inmediato, mide los resultados y ajusta.</p>
                        </div>
                    </div>
                    
                    <p class="ebook-highlight-line">"No esperes a saberlo todo para empezar; empieza con lo que sabes y aprende en el camino."</p>
                `
            },
            {
                num: '2',
                title: 'Marketing Digital: El Motor de tu Negocio',
                content: `
                    <p class="ebook-para">El marketing digital es el conjunto de estrategias y tácticas que utilizan las empresas y emprendedores para conectar con su audiencia, generar confianza y convertir seguidores en clientes a través de canales digitales. En la economía actual, la atención es el recurso más valioso y escaso. Cada persona recibe miles de mensajes al día, y solo unos pocos logran captar su interés. Entender cómo funciona la economía de la atención es el primer paso para construir un negocio online rentable.</p>
                    
                    <p class="ebook-para">El dinero en Internet se genera a través de un proceso claro y predecible: primero captas la atención de personas que tienen un problema o necesidad, luego construyes confianza con ellas a través de contenido valioso y comunicación auténtica, y finalmente les ofreces una solución que están dispuestos a pagar. Este proceso, conocido como el embudo de conversión, es la base de cualquier negocio digital exitoso.</p>
                    
                    <div class="ebook-block-card" style="margin-bottom: 24px;">
                        <h4>¿Qué es el Marketing Digital?</h4>
                        <p>Abarca todas las acciones que realizas en canales online para atraer, involucrar y convertir a tu audiencia ideal. Incluye redes sociales, email marketing, contenido en blog, SEO y mucho más. No necesitas dominar todo al mismo tiempo: elige uno o dos canales, domínalos y luego expande tu presencia. La clave está en entender que el marketing digital no es publicidad intrusiva; es la creación de valor que atrae a las personas correctas de forma natural.</p>
                    </div>

                    <div class="ebook-success-box">
                        <h4 style="font-family:var(--font-title); font-weight:700; margin-bottom:10px;">El Ciclo de Conversión (Las 4 Etapas)</h4>
                        <ul class="ebook-ul">
                            <li><strong>Atención:</strong> Captas el interés de tu audiencia con contenido relevante y atractivo que resuelve sus dudas o entretiene.</li>
                            <li><strong>Confianza:</strong> Construyes una relación auténtica mediante contenido de valor constante, testimonios y transparencia.</li>
                            <li><strong>Conversión:</strong> Ofreces una solución específica que tu audiencia necesita y está dispuesta a comprar.</li>
                            <li><strong>Fidelización:</strong> Mantienes la relación post-venta para generar recompras, referencias y construir una comunidad leal.</li>
                        </ul>
                    </div>

                    <p class="ebook-para">Comprender este ciclo cambia completamente la forma en que abordas tu presencia online. En lugar de pensar "¿cómo vendo más?", empiezas a pensar "¿cómo ayudo más?". Cuando te centras en aportar valor real, las ventas llegan de forma natural.</p>
                `
            },
            {
                num: '3 y 4',
                title: 'Marca Personal y Perfiles',
                content: `
                    <p class="ebook-para">Tu marca personal es la percepción que las personas tienen de ti cuando no estás presente. En el mundo digital, tu marca personal se construye principalmente a través de tus perfiles en redes sociales, tu contenido y la forma en que te comunicas. Una marca personal fuerte te permite diferenciarte en un mercado saturado, atraer a tu audiencia ideal y generar confianza antes incluso de que alguien hable contigo directamente.</p>
                    
                    <p class="ebook-para">Elegir un nicho es una de las decisiones más importantes que tomarás. Un nicho bien definido te permite convertirte en referente en un área específica, en lugar de ser uno más del montón. No se trata de limitarte, sino de especializarte para destacar. Cuanto más específico sea tu nicho al principio, más fácil será atraer a las personas correctas y más rápido crecerá tu autoridad percibida en ese tema.</p>
                    
                    <div class="ebook-grid">
                        <div class="ebook-block-card">
                            <h4>Cómo Elegir tu Nicho</h4>
                            <p>Elige la intersección entre lo que sabes hacer bien, lo que te apasiona y lo que el mercado necesita y está dispuesto a pagar. Investiga qué problemas tiene tu audiencia potencial, qué soluciones buscan y qué competencia existe. Un nicho rentable tiene demanda comprobada, competencia moderada y margen para diferenciarte.</p>
                        </div>
                        <div class="ebook-block-card">
                            <h4>Cómo Diferenciarte</h4>
                            <p>Tu mayor ventaja competitiva eres tú mismo. Tu historia, tu perspectiva única, tu forma de comunicar y tu personalidad son imposibles de copiar. No intentes imitar a otros creadores; en su lugar, amplifica lo que te hace diferente. La autenticidad atrae más que la perfección, y las personas conectan con personas reales.</p>
                        </div>
                    </div>
                    
                    <div class="ebook-block-card" style="margin-bottom: 24px;">
                        <h4>Optimización de Perfiles</h4>
                        <p>Tu perfil es tu tarjeta de presentación digital. Los tres elementos esenciales son: una foto profesional de calidad, una biografía clara que explique qué haces y para quién, y una llamada a la acción (CTA) directa que dirija el tráfico a tu WhatsApp o página.</p>
                    </div>

                    <div class="ebook-warning-box">
                        <i data-lucide="alert-triangle"></i>
                        <div class="ebook-warning-box-content">
                            <strong>Errores comunes a evitar:</strong> Foto de perfil borrosa o informal · Biografía que no explica qué haces o qué vendes · Sin llamada a la acción clara (sin link) · Perfil inconsistente entre plataformas · No actualizar la información de contacto.
                        </div>
                    </div>
                `
            },
            {
                num: '5',
                title: 'Creación de Contenido',
                content: `
                    <p class="ebook-para">El contenido es el combustible de cualquier negocio online. Sin contenido, no hay atención; sin atención, no hay confianza; sin confianza, no hay ventas. Sin embargo, no todo el contenido es igual. En esta guía aprenderás a crear tres tipos de vídeo estratégicamente diferentes, cada uno con un propósito específico dentro de tu funnel de marketing. Dominar estos formatos te permitirá construir una estrategia que atrae, educa y convierte.</p>
                    
                    <p class="ebook-para">El storytelling es el hilo conductor que une todos tus contenidos. Las personas no recuerdan datos ni estadísticas; recuerdan historias. Cuando incorporas narrativa en tus vídeos, aumentas la retención, la conexión emocional y la probabilidad de que tu audiencia tome acción.</p>
                    
                    <div class="ebook-grid">
                        <div class="ebook-block-card" style="border-top: 3px solid #3B82F6;">
                            <h4>Vídeo Viral</h4>
                            <p><strong>Objetivo:</strong> Alcance masivo y conseguir nuevos seguidores.</p>
                            <p style="margin-top:8px; font-size:0.85rem; color:var(--color-text-secondary);">
                                Diseñados para ser compartidos. Usan ganchos potentes en los primeros 3 segundos, emociones intensas (humor, inspiración) y temas amplios. No venden directamente; atraen tráfico orgánico.
                            </p>
                        </div>
                        <div class="ebook-block-card" style="border-top: 3px solid var(--color-primary);">
                            <h4>Vídeo de Valor</h4>
                            <p><strong>Objetivo:</strong> Construir autoridad, resolver dudas y generar confianza.</p>
                            <p style="margin-top:8px; font-size:0.85rem; color:var(--color-text-secondary);">
                                Educan, informan y resuelven un problema específico de tu nicho. Demuestran tu experiencia en formato de minitutoriales o consejos prácticos. Convierten seguidores en fans.
                            </p>
                        </div>
                    </div>
                    
                    <div class="ebook-block-card" style="border-top: 3px solid #EC4899; margin-bottom: 24px;">
                        <h4>Vídeo de Conversión</h4>
                        <p><strong>Objetivo:</strong> Generar ventas directas y leads cualificados.</p>
                        <p style="margin-top:8px;">Presentan una oferta o producto concreto de forma clara y persuasiva. Explican el problema que resuelven, los beneficios, incluyen pruebas sociales o testimonios y cierran con un CTA directo y sin ambigüedades (ej. "Toca el enlace de mi perfil para empezar hoy").</p>
                    </div>

                    <div class="ebook-success-box">
                        <h4 style="font-family:var(--font-title); font-weight:700; margin-bottom:10px;">Proporción Recomendada de Contenido</h4>
                        <p>Una estrategia equilibrada combina los tres formatos en las siguientes proporciones:</p>
                        <ul class="ebook-ul">
                            <li><strong>50% Contenido de Valor:</strong> Para nutrir y fidelizar.</li>
                            <li><strong>30% Contenido Viral:</strong> Para atraer nueva audiencia.</li>
                            <li><strong>20% Contenido de Conversión:</strong> Para vender tus infoproductos o servicios.</li>
                        </ul>
                    </div>
                `
            },
            {
                num: '6',
                title: 'Crecimiento en Redes Sociales',
                content: `
                    <p class="ebook-para">Las redes sociales son el canal de distribución más poderoso para cualquier emprendedor digital. TikTok e Instagram, en particular, ofrecen oportunidades únicas de crecimiento orgánico incluso para cuentas nuevas. La clave está en entender cómo funciona el algoritmo de cada plataforma, qué tipo de contenido premia y cómo construir una comunidad auténtica alrededor de tu marca personal.</p>
                    
                    <p class="ebook-para">Crecer desde cero no es fácil, pero es completamente posible si aplicas las estrategias correctas de forma consistente. Los primeros seguidores son los más difíciles de conseguir, pero también los más valiosos. Construye relaciones genuinas con ellos, responde a sus comentarios y hazles sentir parte de tu comunidad.</p>
                    
                    <div class="ebook-grid">
                        <div class="ebook-block-card">
                            <h4>Instagram: Mayor Alcance y Conexión</h4>
                            <p>Usa Reels para llegar a personas que no te siguen. Publica Stories diariamente para conectar con tus seguidores actuales. Mantén un feed visualmente atractivo y usa carruseles interactivos para dar valor educativo.</p>
                            <ul class="ebook-ul" style="margin-top: 10px; font-size: 0.85rem;">
                               <li>Publica de 3 a 5 veces por semana.</li>
                               <li>Usa tendencias adaptadas a tu nicho.</li>
                               <li>Interactúa en los comentarios durante la primera hora.</li>
                            </ul>
                        </div>
                        <div class="ebook-block-card">
                            <h4>TikTok: La Plataforma de Confianza</h4>
                            <p>TikTok premia el contenido espontáneo y directo. Su algoritmo es ultra-eficiente para mostrar tu video a personas interesadas en tu tema específico sin importar tus seguidores.</p>
                            <ul class="ebook-ul" style="margin-top: 10px; font-size: 0.85rem;">
                               <li>Los primeros 3 segundos son clave para evitar el scroll.</li>
                               <li>Haz directos (lives) semanales para profundizar relaciones.</li>
                               <li>El 80% de tu contenido debe educar o inspirar antes de vender.</li>
                            </ul>
                        </div>
                    </div>

                    <div class="ebook-highlight-line">
                        "Regla de Oro: Se necesitan en promedio 30 días de consistencia diaria para empezar a ver los primeros resultados orgánicos significativos."
                    </div>
                `
            },
            {
                num: '7 y 8',
                title: 'Comunicación, Ventas y WhatsApp',
                content: `
                    <p class="ebook-para">El dinero está en la conversación. Esta es una de las verdades más importantes del marketing digital moderno. Puedes tener miles de seguidores, pero si no sabes comunicarte con ellos de forma efectiva, convertir esa audiencia en ingresos será muy difícil. La prospección, el manejo de objeciones y el cierre de ventas son habilidades que se aprenden y se perfeccionan con la práctica. No necesitas ser agresivo ni manipulador; necesitas ser útil, claro y directo.</p>
                    
                    <p class="ebook-para">WhatsApp Business es una de las herramientas más poderosas y subestimadas para el emprendedor digital. Configurar correctamente tu perfil, utilizar las herramientas de automatización y mantener una organización impecable te permitirá escalar tus ventas sin perder la calidad en la atención.</p>
                    
                    <div class="ebook-grid">
                        <div class="ebook-block-card">
                            <h4>Prospección Efectiva</h4>
                            <p>No es molestar a desconocidos; es iniciar conversaciones genuinas con personas que ya han mostrado interés en lo que haces. Responde a comentarios, interactúa con stories y participa en comunidades. Si te escriben, ya dieron el primer paso; tu trabajo es guiarles a la solución.</p>
                        </div>
                        <div class="ebook-block-card">
                            <h4>Manejo de Objeciones</h4>
                            <p>Las objeciones no son rechazos; son preguntas disfrazadas. Cuando alguien dice "es muy caro", realmente te está diciendo: "no estoy seguro de que esto valga la pena para mí". Escucha, valida su preocupación y responde destacando beneficios concretos y pruebas sociales.</p>
                        </div>
                    </div>

                    <div class="ebook-grid">
                        <div class="ebook-block-card">
                            <h4>Cierre de Ventas</h4>
                            <p>El cierre no es presionar; es guiar. Haz preguntas que ayuden a la persona a visualizar cómo mejorará su situación con tu producto o servicio. Ofrece garantías claras, elimina el riesgo percibido y haz que el proceso de pago sea lo más sencillo posible.</p>
                        </div>
                        <div class="ebook-block-card">
                            <h4>WhatsApp Business Profesional</h4>
                            <p>Usa un logo limpio o una foto profesional, configura tu catálogo de infoproductos, respuestas rápidas y mensajes de ausencia. Etiqueta a tus contactos como "Nuevo Interesado", "Pendiente de Pago" o "Cliente Aprobado" para dar seguimiento profesional.</p>
                        </div>
                    </div>

                    <div class="ebook-success-box">
                        <h4 style="font-family:var(--font-title); font-weight:700; margin-bottom:10px;">Plantilla de Cierre por WhatsApp:</h4>
                        <p style="font-size:0.9rem; color:var(--color-text-secondary); line-height:1.6;">
                            <strong>Presentación:</strong> "Este curso está pensado para personas que quieren empezar sin perder tiempo buscando información dispersa. En él encontrarás los pasos clave y plantillas prácticas."<br>
                            <strong>Beneficios:</strong> "Te ayuda a evitar errores comunes, avanzar más rápido y tener una ruta clara desde el principio."<br>
                            <strong>Objeción de Precio:</strong> "Entiendo tu duda. Piensa que no estás pagando solo por un archivo, sino por el tiempo, la estructura y la claridad que te ahorras."<br>
                            <strong>Confirmación:</strong> "Perfecto, ya quedó confirmado tu acceso. Aquí tienes el enlace de visualización y cualquier duda me escribes por este medio."
                        </p>
                    </div>
                `
            },
            {
                num: '9',
                title: 'Productividad: Trabaja Mejor, No Más',
                content: `
                    <p class="ebook-para">La productividad no se trata de hacer más cosas en menos tiempo; se trata de hacer las cosas correctas en el momento adecuado. Como emprendedor digital, tu tiempo es tu recurso más valioso y más limitado. Aprender a gestionarlo de forma efectiva es una de las habilidades con mayor retorno de inversión que puedes desarrollar. Un emprendedor enfocado que trabaja 4 horas produce mucho más que uno distraído que pasa 10 horas frente a la pantalla.</p>
                    
                    <p class="ebook-para">La organización es el pilar de la productividad. Sin un sistema claro, es fácil caer en la trampa de estar siempre ocupado pero nunca avanzar en lo que realmente importa. Define tus prioridades, establece bloques de tiempo específicos para cada tipo de tarea y elimina las distracciones durante tus periodos de trabajo profundo.</p>
                    
                    <div class="ebook-grid">
                        <div class="ebook-block-card">
                            <h4>Estrategias de Gestión del Tiempo</h4>
                            <ul class="ebook-ul" style="font-size: 0.85rem; margin-top: 10px;">
                                <li><strong>Time blocking:</strong> Divide tu día en bloques de 90 minutos enfocados exclusivamente en una sola tarea importante.</li>
                                <li><strong>Regla del 80/20:</strong> Identifica el 20% de las actividades que generan el 80% de tus ingresos o resultados y priorízalas.</li>
                                <li><strong>Mañanas sagradas:</strong> Dedica las primeras 2 horas del día a tus tareas críticas sin mirar el celular ni responder mensajes.</li>
                            </ul>
                        </div>
                        <div class="ebook-block-card">
                            <h4>Herramientas Esenciales</h4>
                            <ul class="ebook-ul" style="font-size: 0.85rem; margin-top: 10px;">
                                <li><strong>Notion o ClickUp:</strong> Gestión de proyectos, notas y base de datos de tu negocio.</li>
                                <li><strong>Canva:</strong> Creación rápida de contenido gráfico sin conocimientos de diseño.</li>
                                <li><strong>CapCut:</strong> Edición profesional de videos de forma gratuita desde tu celular.</li>
                                <li><strong>ChatGPT:</strong> Asistente de inteligencia artificial para redacción de copys, ideas y guiones.</li>
                            </ul>
                        </div>
                    </div>

                    <div class="ebook-block-card" style="margin-bottom: 24px;">
                        <h4>Trabajo Profundo vs. Descanso Estratégico</h4>
                        <p>Bloquea 2-3 horas diarias para trabajar sin distracciones (cierra pestañas innecesarias, desactiva notificaciones). Al mismo tiempo, recuerda que el descanso no es tiempo perdido. Tu cerebro necesita pausas y días de desconexión para mantener la creatividad y tomar buenas decisiones.</p>
                    </div>
                `
            },
            {
                num: '10',
                title: 'Plan de Acción de 30 Días',
                content: `
                    <p class="ebook-para">Este plan de acción está diseñado en 4 semanas estructuradas para hacer funcionar tu negocio digital y monetizar tu conocimiento vendiendo infoproductos (como este e-book).</p>
                    
                    <div class="ebook-grid">
                        <div class="ebook-block-card">
                            <h4>Semana 1: Construir Base</h4>
                            <p>Define tu nicho y propuesta de valor única. Crea y optimiza tus perfiles de redes sociales (Instagram, TikTok). Diseña una biografía atractiva y pon tu enlace de contacto a WhatsApp.</p>
                        </div>
                        <div class="ebook-block-card">
                            <h4>Semana 2: Crecer Visibilidad</h4>
                            <p>Empieza a publicar contenido de forma consistente (mínimo 1 video diario). Enfócate en ganchos de 3 segundos para capturar atención. Participa en comunidades de tu nicho.</p>
                        </div>
                    </div>

                    <div class="ebook-grid">
                        <div class="ebook-block-card">
                            <h4>Semana 3: Generar Confianza</h4>
                            <p>Publica videos de valor profundo respondiendo dudas de tu audiencia. Muestra el detrás de escena de tu proceso. Empieza a crear una lista de interesados (leads).</p>
                        </div>
                        <div class="ebook-block-card">
                            <h4>Semana 4: Ventas y Monetización</h4>
                            <p>Lanza tus videos de conversión y ofertas. Atiende a los interesados por WhatsApp usando nuestras plantillas de mensajes. Cierra tus primeras ventas y entrega el acceso.</p>
                        </div>
                    </div>

                    <div class="ebook-success-box">
                        <h4 style="font-family:var(--font-title); font-weight:700; margin-bottom:10px;">Hábitos Clave para el Plan:</h4>
                        <p style="font-size:0.9rem; color:var(--color-text-secondary); line-height:1.6;">
                            1. Consistencia diaria (2 horas de trabajo enfocado).<br>
                            2. Medición semanal de métricas (vistas, mensajes recibidos, cierres).<br>
                            3. Ajustar contenido según la respuesta del público.<br>
                            4. Mantener una mentalidad de aprendizaje activo.
                        </p>
                    </div>
                `
            }
        ]
    };

    // ==========================================
    // 30 DAILY CONTENT IDEAS (ONE FOR EACH DAY)
    // ==========================================
    const dailyContentIdeas = [
        {
            day: 1,
            type: 'Vídeo Viral',
            idea: 'Tu transformación personal al buscar la independencia financiera.',
            hook: '“Cómo pasé de no tener un peso para mis salidas a crear mi propio negocio digital antes de los 20.”',
            body: 'Cuenta tu historia honesta: la frustración de depender de tus padres, el descubrimiento de las habilidades digitales, y cómo decidiste empezar. Muestra clips tuyos trabajando con tu laptop o celular.',
            cta: '“Escríbeme por WhatsApp al link de mi biografía y te paso el acceso a la biblioteca de recursos para que empieces gratis.”'
        },
        {
            day: 2,
            type: 'Vídeo de Valor',
            idea: 'La regla de oro del marketing de contenidos en redes sociales.',
            hook: '“Si estás subiendo contenido y nadie te compra, probablemente no estás aplicando la regla del 80/20.”',
            body: 'Explica que el 80% de tus publicaciones deben educar, entretener o inspirar, y solo el 20% debe ser para vender directamente. Da un ejemplo de qué publicar en cada porcentaje.',
            cta: '“Regístrate gratis en mi plataforma y lee el Capítulo 5 de mi e-book para aprender a estructurar tu contenido.”'
        },
        {
            day: 3,
            type: 'Vídeo de Conversión',
            idea: 'Oferta directa del infoproducto "De Cero a Ingresos Online".',
            hook: '“¿Quieres aprender habilidades digitales pero no sabes por dónde empezar?”',
            body: 'Presenta el e-book "De Cero a Ingresos Online". Explica que reúne 10 capítulos paso a paso sobre mentalidad, marca personal, ventas por WhatsApp y un plan de acción de 30 días.',
            cta: '“Haz clic en el botón QUIERO EMPEZAR en el enlace de mi perfil para enviarme un WhatsApp y darte acceso inmediato.”'
        },
        {
            day: 4,
            type: 'Carrusel Educativo',
            idea: '3 errores fatales en la biografía de Instagram que te cuestan ventas.',
            hook: '“Tu biografía de Instagram está perdiendo clientes por culpa de esto...”',
            body: 'Desarrolla 3 puntos: 1) Foto de perfil poco profesional o borrosa. 2) No explicar a quién ayudas y qué ofreces. 3) No tener un enlace directo a WhatsApp.',
            cta: '“Accede a la plataforma y revisa el Capítulo 4 de la guía para ver ejemplos de bios de afiliados de alta conversión.”'
        },
        {
            day: 5,
            type: 'Vídeo de Valor',
            idea: 'Cómo elegir un nicho rentable en internet sin experiencia.',
            hook: '“El error número uno al empezar un negocio digital es intentar venderle a todo el mundo.”',
            body: 'Explica el concepto del nicho: la intersección entre lo que sabes hacer bien, lo que te apasiona y lo que el mercado está dispuesto a comprar. Diles que apunten a un nicho específico.',
            cta: '“Entra a mi biblioteca privada, regístrate y lee el Capítulo 3 de la guía paso a paso.”'
        },
        {
            day: 6,
            type: 'Vídeo Viral',
            idea: 'Derribando el mito de que necesitas una computadora para emprender.',
            hook: '“¿Crees que necesitas una computadora cara para empezar a generar ingresos online?”',
            body: 'Muestra tu celular. Explica que hoy en día puedes crear contenidos, gestionar perfiles, editar videos con CapCut y cerrar ventas por WhatsApp únicamente usando tu celular.',
            cta: '“Escríbeme por WhatsApp y te muestro cómo mis alumnos aprobados estudian directamente desde su teléfono.”'
        },
        {
            day: 7,
            type: 'Vídeo de Conversión',
            idea: 'El valor del acompañamiento uno a uno en negocios digitales.',
            hook: '“La razón por la que la mayoría falla en internet es que intentan hacerlo solos y sin guía.”',
            body: 'Explica que al adquirir el e-book "De Cero a Ingresos Online" no solo recibes un archivo, sino acceso a una comunidad privada de apoyo y clases en vivo para resolver dudas conmigo.',
            cta: '“Toca el botón QUIERO EMPEZAR en mi web y hablemos directamente por WhatsApp para darte de alta.”'
        },
        {
            day: 8,
            type: 'Vídeo de Valor',
            idea: 'Qué responder cuando un cliente te dice "es muy caro".',
            hook: '“Si te dicen que tu producto es muy caro, esto es lo que debes responder en WhatsApp...”',
            body: 'Explica que "es muy caro" significa "no entiendo tu valor". Enséñales a validar la objeción: "Entiendo tu duda, pero ten en cuenta que no pagas por un archivo, sino por el tiempo y la estructura que te vas a ahorrar".',
            cta: '“El Capítulo 8 de la plataforma tiene plantillas completas de mensajes de cierre. Regístrate para verlas.”'
        },
        {
            day: 9,
            type: 'Vídeo Viral',
            idea: 'Los 3 hábitos diarios que cambiaron mi productividad.',
            hook: '“Trabajar más horas no te hará ganar más dinero. Te lo demuestro.”',
            body: 'Habla de: 1) Time blocking (bloques de 90 min de trabajo profundo). 2) Las mañanas sagradas (2 horas sin mirar redes). 3) Priorizar solo 3 tareas clave al día.',
            cta: '“El Capítulo 9 detalla mi rutina diaria completa. Accede gratis registrándote en mi web.”'
        },
        {
            day: 10,
            type: 'Vídeo de Valor',
            idea: 'Cómo funciona el ciclo de conversión en el marketing digital.',
            hook: '“Este es el proceso exacto que sigue un seguidor antes de comprarte.”',
            body: 'Explica brevemente las 4 etapas: Atención (contenido viral), Confianza (contenido de valor y testimonios), Conversión (oferta directa) y Fidelización (post-venta).',
            cta: '“Mira el diagrama interactivo del Capítulo 2 ingresando a la plataforma de miembros.”'
        },
        {
            day: 11,
            type: 'Vídeo de Conversión',
            idea: 'Testimonio o caso de éxito de un alumno de la plataforma.',
            hook: '“Cómo Franco pasó de ver videos sueltos en YouTube a conseguir sus primeros clientes en 30 días.”',
            body: 'Muestra o lee el testimonio de Franco Pérez. Resalta que la diferencia fue el orden de la capacitación y el soporte diario.',
            cta: '“Únete tú también. Escríbeme por WhatsApp al número de la web y te daré los detalles de ingreso.”'
        },
        {
            day: 12,
            type: 'Vídeo de Valor',
            idea: 'La diferencia entre prospección y molestar a desconocidos.',
            hook: '“Por favor, deja de mandar spam a personas que no te conocen. Haz esto en su lugar.”',
            body: 'Explica que debes interactuar con stories, responder comentarios y aportar valor en comunidades de tu nicho. Genera relaciones antes de ofrecer nada.',
            cta: '“Aprende el método correcto en el Capítulo 7 de nuestro portal privado.”'
        },
        {
            day: 13,
            type: 'Vídeo Viral',
            idea: 'Un día en la vida de un emprendedor digital remoto.',
            hook: '“Cómo es un día cualquiera trabajando desde mi casa o desde un café.”',
            body: 'Muestra clips rápidos: despertándote sin alarmas estridentes, desayunando tranquilo, trabajando 2 horas en tu laptop o celular, editando contenidos. Resalta la libertad geográfica.',
            cta: '“Si quieres aprender a hacer esto desde cero, regístrate en mi plataforma hoy mismo.”'
        },
        {
            day: 14,
            type: 'Vídeo de Valor',
            idea: 'Los 3 tipos de videos que debes subir para crecer y vender.',
            hook: '“Si solo subes videos virales, tendrás seguidores pero no dinero. Si solo vendes, te dejarán de seguir.”',
            body: 'Explica la combinación: Viral (atrae), Valor (construye confianza) y Conversión (cierra la venta).',
            cta: '“Encuentra guiones para cada tipo de video en el Capítulo 5 de la biblioteca de recursos.”'
        },
        {
            day: 15,
            type: 'Vídeo de Conversión',
            idea: 'El plan de acción de 30 días para lanzar tu proyecto.',
            hook: '“¿Listo para lanzar tu proyecto digital y monetizarlo en los próximos 30 días?”',
            body: 'Presenta el plan de acción estructurado por semanas: Semana 1 (bases), Semana 2 (visibilidad), Semana 3 (confianza) y Semana 4 (monetización).',
            cta: '“El plan detallado está en el Capítulo 10 de mi e-book. Toca el botón QUIERO EMPEZAR para comenzar hoy.”'
        },
        {
            day: 16,
            type: 'Vídeo de Valor',
            idea: 'Herramientas gratuitas para editar videos de forma profesional.',
            hook: '“No necesitas programas de edición caros en tu computadora para crear videos virales.”',
            body: 'Recomienda CapCut para celular. Destaca 3 funciones útiles: subtítulos automáticos, transiciones suaves y efectos de sonido dinámicos para captar retención.',
            cta: '“Regístrate y ve la lista completa de herramientas recomendadas en el Capítulo 9 de la plataforma.”'
        },
        {
            day: 17,
            type: 'Vídeo Viral',
            idea: 'La importancia de la disciplina sobre la motivación.',
            hook: '“La motivación es mentira. Lo que realmente necesitas es disciplina.”',
            body: 'Explica que la motivación dura pocos días. Los resultados se construyen en los días que trabajas sin tener ganas. La rutina y la disciplina vencen al talento.',
            cta: '“Lee más sobre hábitos de mentalidad en el Capítulo 1 de nuestra biblioteca privada.”'
        },
        {
            day: 18,
            type: 'Carrusel Educativo',
            idea: 'Estructura ganadora de un mensaje de bienvenida en WhatsApp Business.',
            hook: '“Configura este mensaje de bienvenida automático en tu WhatsApp para no perder ningún cliente.”',
            body: 'Estructura: 1) Saludo y agradecimiento. 2) Breve explicación de lo que ofreces o el link del recurso. 3) Pregunta de cierre para iniciar conversación.',
            cta: '“Las plantillas exactas están en el Capítulo 8 de la biblioteca de recursos. Accede registrándote gratis.”'
        },
        {
            day: 19,
            type: 'Vídeo de Valor',
            idea: 'Cómo usar ChatGPT como tu asistente de contenidos.',
            hook: '“Deja de pasar horas pensando qué publicar en tus redes. Pon a trabajar a la Inteligencia Artificial.”',
            body: 'Muestra un prompt efectivo: “Actúa como un experto en marketing y dame 5 ganchos virales para un video sobre ventas digitales”. Muestra la velocidad de respuesta.',
            cta: '“Encuentra una lista de prompts listos para usar en la sección de herramientas de nuestra plataforma.”'
        },
        {
            day: 20,
            type: 'Vídeo de Conversión',
            idea: 'Eliminando el miedo a vender en WhatsApp.',
            hook: '“Vender por WhatsApp no es presionar ni rogar. Te explico cómo se hace.”',
            body: 'Explica que vender es guiar a la persona hacia una solución. Haz preguntas sobre su situación actual, ofrece tu infoproducto como la solución y elimina el riesgo con soporte garantizado.',
            cta: '“Toca el botón QUIERO EMPEZAR en la web y hablemos directamente por WhatsApp para activar tu membresía.”'
        },
        {
            day: 21,
            type: 'Vídeo Viral',
            idea: 'Tu primer paso en el emprendimiento digital sin inversión.',
            hook: '“Cómo empecé en internet buscando generar mis propios ingresos sin depender de mis padres.”',
            body: 'Cuenta tu historia: la necesidad de comprarte tus propias cosas y salidas, la investigación en redes, y la decisión de aprender marketing digital. Inspira a tomar acción.',
            cta: '“Regístrate en mi plataforma en el link de mi perfil y accede a los contenidos gratuitos.”'
        },
        {
            day: 22,
            type: 'Vídeo de Valor',
            idea: '3 consejos rápidos de diseño para Canva.',
            hook: '“Haz que tus imágenes de Canva dejen de parecer plantillas genéricas aplicando estos 3 tips.”',
            body: 'Consejos: 1) Limítate a usar solo 2 tipografías. 2) Usa una paleta de 3 colores coherentes (ej: negro, blanco y verde). 3) Deja espacios vacíos para que el diseño respire.',
            cta: '“Revisa el Capítulo 9 de herramientas de diseño en la plataforma de miembros.”'
        },
        {
            day: 23,
            type: 'Vídeo de Conversión',
            idea: 'Garantías y acompañamiento del infoproducto.',
            hook: '“Si compras mi e-book y te trabas en el proceso, no estarás solo. Te explico por qué.”',
            body: 'Menciona que la compra incluye acceso ilimitado a nuestra comunidad de apoyo en Telegram/WhatsApp y clases en vivo semanales para revisar tus redes y avances conmigo.',
            cta: '“Haz clic en el enlace de mi perfil, regístrate y solicita acceso al grupo.”'
        },
        {
            day: 24,
            type: 'Carrusel Educativo',
            idea: 'La regla del gancho de los 3 segundos.',
            hook: '“Si tus videos no atrapan en los primeros 3 segundos, estás perdiendo el 90% de tus vistas.”',
            body: 'Explica que el cerebro hace scroll muy rápido. Necesitas un gancho visual (texto llamativo en pantalla) y auditivo (una frase contundente que despierte curiosidad).',
            cta: '“El Capítulo 6 de redes sociales tiene una lista de ganchos virales. Míralos registrándote gratis.”'
        },
        {
            day: 25,
            type: 'Vídeo de Valor',
            idea: 'Cómo organizar tu día de trabajo en bloques (Time Blocking).',
            hook: '“Cómo logro avanzar el trabajo de una semana en solo 3 horas diarias.”',
            body: 'Muestra tu agenda o Notion. Explica que agrupas tareas similares en bloques de 90 minutos de enfoque total, sin interrupciones ni celular.',
            cta: '“Encuentra plantillas de Notion de productividad en la pestaña de recursos de la plataforma.”'
        },
        {
            day: 26,
            type: 'Vídeo Viral',
            idea: 'El cambio de mentalidad de buscar empleo a construir algo propio.',
            hook: '“Por qué decidí dejar de buscar un trabajo tradicional y enfocarme en aprender habilidades digitales.”',
            body: 'Compara: cumplir horarios fijos por un sueldo mínimo vs. la oportunidad de crecer tu propio negocio sin límites de ingresos y desde cualquier lugar. Inspira libertad.',
            cta: '“Comienza a estudiar hoy mismo. Regístrate en mi plataforma en el link de mi perfil.”'
        },
        {
            day: 27,
            type: 'Vídeo de Conversión',
            idea: 'Acceso directo a las plantillas de mensajes de cierre.',
            hook: '“Te doy las plantillas exactas que utilizo para cerrar ventas por WhatsApp todos los días.”',
            body: 'Menciona que el e-book "De Cero a Ingresos Online" incluye todas las plantillas para responder preguntas frecuentes y manejar objeciones de clientes interesados.',
            cta: '“Toca el botón QUIERO EMPEZAR al final de mi web y te guiaré por WhatsApp para iniciar hoy.”'
        },
        {
            day: 28,
            type: 'Vídeo de Valor',
            idea: 'Cómo optimizar las fotos de perfil en tus redes.',
            hook: '“La foto de perfil de tu negocio digital está arruinando tu marca personal por esto...”',
            body: 'Consejos: usa buena iluminación frontal, fondo liso contrastante, sonríe para generar confianza y encuadra desde los hombros hacia arriba. Evita fotos grupales o de cuerpo entero.',
            cta: '“Encuentra ejemplos de perfiles optimizados en el Capítulo 4 de nuestra guía.”'
        },
        {
            day: 29,
            type: 'Vídeo de Conversión',
            idea: 'Última oportunidad para sumarse al cupo limitado.',
            hook: '“Estamos cerrando los cupos de acompañamiento personalizado para esta semana.”',
            body: 'Explica que limitas el número de alumnos aprobados para poder brindar soporte de calidad uno a uno y resolver dudas en el canal privado de forma ágil.',
            cta: '“No dejes pasar más tiempo. Toca el link de mi biografía, regístrate y mándame un WhatsApp para arrancar.”'
        },
        {
            day: 30,
            type: 'Vídeo de Valor',
            idea: 'Tu plan de acción resumido para el próximo mes.',
            hook: '“Esto es lo que debes hacer si quieres construir tu negocio online en los próximos 30 días.”',
            body: 'Resume el plan de 4 semanas: 1) Optimiza tu bio y nicho. 2) Publica contenido consistente de valor. 3) Atrae leads a WhatsApp. 4) Cierra ventas con respuestas automatizadas.',
            cta: '“Tienes la guía completa y el acompañamiento en la plataforma. ¡Te veo adentro!”'
        }
    ];

    // ==========================================
    // PORTAL DE MIEMBROS & ROUTING (SPA)
    // ==========================================

    const showView = (viewId) => {
        document.querySelectorAll('.platform-view').forEach(view => view.classList.add('hidden'));
        const targetView = document.getElementById(viewId);
        if (targetView) targetView.classList.remove('hidden');
        renderIcons();
    };

    const updatePlatformBar = (user) => {
        const welcomeMsg = document.getElementById('platform-welcome-msg');
        const userStatusContainer = document.getElementById('platform-user-status');
        
        if (user) {
            welcomeMsg.innerHTML = `Hola, <span class="color-green">${user.name}</span> (${user.role === 'admin' ? 'Administrador' : 'Miembro'})`;
            userStatusContainer.innerHTML = `
                <span class="platform-user-email">${user.email}</span>
                ${user.role === 'admin' ? '<a href="#admin" class="btn btn-secondary btn-sm" style="padding: 6px 12px; font-size: 0.8rem;">Panel Admin</a>' : ''}
                <button class="platform-logout-btn" id="portal-logout-action">Cerrar Sesión</button>
            `;
            
            document.getElementById('portal-logout-action').addEventListener('click', logoutUser);
        } else {
            welcomeMsg.textContent = 'Bienvenido al Portal de Miembros';
            userStatusContainer.innerHTML = `
                <a href="#plataforma/login" class="btn btn-primary btn-sm" style="padding: 6px 12px; font-size: 0.8rem;">Iniciar Sesión</a>
            `;
        }
    };

    const updateHeaderAuthActions = () => {
        const currentUser = getCurrentUser();
        const adminBtn = document.getElementById('admin-panel-btn');
        const loginBtn = document.getElementById('nav-login-btn');
        const registerBtn = document.getElementById('nav-register-btn');
        const userInfo = document.getElementById('nav-user-info');
        const userNameEl = document.getElementById('nav-user-name');
        
        // Admin Panel header button
        if (currentUser && currentUser.role === 'admin') {
            adminBtn.classList.remove('hidden');
        } else {
            adminBtn.classList.add('hidden');
        }

        // Show/hide auth buttons vs user greeting
        if (currentUser) {
            if (loginBtn) loginBtn.classList.add('hidden');
            if (registerBtn) registerBtn.classList.add('hidden');
            if (userInfo) userInfo.classList.remove('hidden');
            if (userNameEl) userNameEl.textContent = 'Hola, ' + currentUser.name.split(' ')[0];
        } else {
            if (loginBtn) loginBtn.classList.remove('hidden');
            if (registerBtn) registerBtn.classList.remove('hidden');
            if (userInfo) userInfo.classList.add('hidden');
        }

        // Adjust navbar highlight
        const hash = window.location.hash || '#';
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (hash === '#' && link.getAttribute('href') === '#') {
                link.classList.add('active');
            } else if (hash.startsWith('#plataforma') && link.getAttribute('href') === '#plataforma') {
                link.classList.add('active');
            } else if (hash === '#admin' && link.getAttribute('href') === '#plataforma') {
                link.classList.add('active');
            }
        });
    };

    const redirectUserDashboard = (user) => {
        if (user.role === 'admin') {
            window.location.hash = '#admin';
        } else if (user.status === 'aprobado') {
            window.location.hash = '#plataforma/biblioteca';
        } else if (user.status === 'pendiente') {
            window.location.hash = '#plataforma/espera';
        } else if (user.status === 'rechazado') {
            showDeniedView('Tu solicitud de registro ha sido rechazada por el administrador.');
        }
    };

    const showDeniedView = (message) => {
        showView('denied-view');
        const msgEl = document.getElementById('denied-message');
        if (msgEl) msgEl.textContent = message;
    };

    const logoutUser = () => {
        if (window.currentPdfBlobUrl) {
            URL.revokeObjectURL(window.currentPdfBlobUrl);
            window.currentPdfBlobUrl = null;
        }
        removeCurrentUser();
        window.location.hash = '#plataforma/login';
    };

    const spaRouter = () => {
        const hash = window.location.hash || '#';
        const landingContent = document.getElementById('landing-content');
        const platformContent = document.getElementById('platform-content');
        const floatWa = document.querySelector('.floating-whatsapp');
        
        const currentUser = getCurrentUser();

        // 1. Landing Page routing
        if (hash === '#' || hash === '') {
            landingContent.classList.remove('hidden');
            platformContent.classList.add('hidden');
            if (floatWa) floatWa.classList.remove('hidden');
            updateHeaderAuthActions();
            return;
        }

        // 2. Platform routing
        landingContent.classList.add('hidden');
        platformContent.classList.remove('hidden');
        if (floatWa) floatWa.classList.add('hidden');

        // Route dispatcher
        if (hash === '#plataforma' || hash === '#plataforma/login' || hash === '#plataforma/registro') {
            if (currentUser) {
                redirectUserDashboard(currentUser);
            } else {
                showView('auth-view');
                if (hash === '#plataforma/registro') {
                    switchToRegister();
                } else {
                    switchToLogin();
                }
            }
        } else if (hash === '#plataforma/espera') {
            if (!currentUser) {
                window.location.hash = '#plataforma/login';
            } else if (currentUser.role === 'admin') {
                window.location.hash = '#admin';
            } else if (currentUser.status === 'aprobado') {
                window.location.hash = '#plataforma/biblioteca';
            } else if (currentUser.status === 'rechazado') {
                showDeniedView('Tu solicitud de registro ha sido rechazada por el administrador.');
            } else {
                showView('pending-view');
            }
        } else if (hash === '#plataforma/biblioteca') {
            if (!currentUser) {
                window.location.hash = '#plataforma/login';
            } else if (currentUser.role === 'admin') {
                window.location.hash = '#admin';
            } else if (currentUser.status === 'pendiente') {
                window.location.hash = '#plataforma/espera';
            } else if (currentUser.status === 'rechazado') {
                showDeniedView('Tu solicitud de registro ha sido rechazada por el administrador.');
            } else {
                showView('library-view');
                loadLibraryPDFs();
            }
        } else if (hash.startsWith('#plataforma/pdf')) {
            if (!currentUser) {
                window.location.hash = '#plataforma/login';
            } else if (currentUser.status !== 'aprobado') {
                redirectUserDashboard(currentUser);
            } else {
                const params = new URLSearchParams(hash.substring(hash.indexOf('?')));
                const pdfId = params.get('id');
                showView('pdf-viewer-view');
                loadPDFInViewer(pdfId);
            }
        } else if (hash === '#admin') {
            if (!currentUser) {
                window.location.hash = '#plataforma/login';
            } else if (currentUser.role !== 'admin') {
                showDeniedView('Acceso denegado. Esta sección es exclusiva para el administrador.');
            } else {
                showView('admin-view');
                loadAdminPanel();
            }
        } else {
            window.location.hash = '#';
        }

        updatePlatformBar(currentUser);
        updateHeaderAuthActions();
    };

    window.addEventListener('hashchange', spaRouter);
    window.addEventListener('load', spaRouter);

    // ==========================================
    // AUTHENTICATION FORMS LOGIC
    // ==========================================
    const tabLogin = document.getElementById('tab-login-btn');
    const tabRegister = document.getElementById('tab-register-btn');
    const formLogin = document.getElementById('login-form');
    const formRegister = document.getElementById('register-form');

    const switchToLogin = () => {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        formLogin.classList.add('active');
        formRegister.classList.remove('active');
    };

    const switchToRegister = () => {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        formRegister.classList.add('active');
        formLogin.classList.remove('active');
    };

    if (tabLogin && tabRegister) {
        tabLogin.addEventListener('click', () => { window.location.hash = '#plataforma/login'; });
        tabRegister.addEventListener('click', () => { window.location.hash = '#plataforma/registro'; });
    }

    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value.trim();

            const users = getUsers();
            const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

            if (!matchedUser) {
                alert('Correo electrónico o contraseña incorrectos.');
                return;
            }

            setCurrentUser(matchedUser);
            formLogin.reset();
            redirectUserDashboard(matchedUser);
        });
    }

    if (formRegister) {
        formRegister.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('register-name').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const whatsapp = document.getElementById('register-whatsapp').value.trim();
            const password = document.getElementById('register-password').value.trim();

            const users = getUsers();
            const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());

            if (emailExists) {
                alert('El correo electrónico ya se encuentra registrado.');
                return;
            }

            const newUser = {
                name,
                email,
                whatsapp,
                password,
                role: 'user',
                status: 'pendiente',
                regDate: new Date().toLocaleDateString('es-ES')
            };

            users.push(newUser);
            saveUsers(users);
            setCurrentUser(newUser);

            const notifications = getNotifications();
            notifications.unshift({
                id: 'notif_' + Date.now(),
                name,
                email,
                whatsapp,
                regDate: newUser.regDate,
                read: false
            });
            saveNotifications(notifications);

            formRegister.reset();
            window.location.hash = '#plataforma/espera';
        });
    }

    document.querySelectorAll('.logout-btn').forEach(btn => {
        btn.addEventListener('click', logoutUser);
    });

    document.querySelectorAll('.btn-back-home').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.hash = '#';
        });
    });

    // ==========================================
    // DAILY CONTENT IDEA GENERATION
    // ==========================================
    const renderDailyContentIdea = () => {
        const container = document.getElementById('daily-content-idea-container');
        if (!container) return;

        // Calculate day index (day 1-30 of the calendar month)
        const dayOfMonth = new Date().getDate();
        const ideaIndex = (dayOfMonth - 1) % 30;
        const idea = dailyContentIdeas[ideaIndex];

        container.className = 'content-idea-card'; // Remove hidden
        container.innerHTML = `
            <div class="content-idea-icon-area">
                <i data-lucide="lightbulb"></i>
            </div>
            <div class="content-idea-content">
                <div class="content-idea-tag">Idea de Contenido del Día (Día ${idea.day}/30)</div>
                <h3 class="content-idea-title">${idea.idea}</h3>
                <p class="content-idea-body">
                    <strong>Formato:</strong> <span class="badge-status aprobado" style="text-transform:none; padding: 2px 8px; font-size: 0.8rem;">${idea.type}</span><br>
                    <strong>Gancho (Hook):</strong> <em>${idea.hook}</em><br>
                    <strong>Desarrollo:</strong> ${idea.body}
                </p>
                <div class="content-idea-strategy-box">
                    <div class="strategy-title">
                        <i data-lucide="rocket" class="icon-sm color-green"></i> Cómo ofrecer el infoproducto:
                    </div>
                    <ul class="strategy-list">
                        <li>Usa el gancho en los primeros 3 segundos para captar atención.</li>
                        <li>Desarrolla el contenido mostrando la portada del e-book "De Cero a Ingresos Online" o grabándote explicándolo.</li>
                        <li><strong>Llamada a la Acción (CTA):</strong> ${idea.cta}</li>
                    </ul>
                </div>
            </div>
        `;
        renderIcons();
    };

    // ==========================================
    // LIBRARY VIEW LOGIC (PDF RETRIEVAL)
    // ==========================================
    const searchLibraryInput = document.getElementById('library-search');
    
    if (searchLibraryInput) {
        searchLibraryInput.addEventListener('input', () => {
            loadLibraryPDFs(searchLibraryInput.value.trim());
        });
    }

    const loadLibraryPDFs = async (query = '') => {
        const grid = document.getElementById('pdf-library-grid');
        const emptyEl = document.getElementById('library-empty');
        grid.innerHTML = '';
        
        // Show daily content idea
        renderDailyContentIdea();

        // Core Seeded Ebook - always available (no DB required)
        const seededEbook = {
            id: ebookData.id,
            title: ebookData.title,
            description: ebookData.description,
            fileName: ebookData.fileName,
            uploadDate: ebookData.uploadDate,
            isEbook: true
        };

        let uploadedPDFs = [];
        try {
            // Try to get PDFs from IndexedDB (may fail on file:// protocol)
            if (window.pdfDb && window.pdfDb.getAllPDFs) {
                uploadedPDFs = await window.pdfDb.getAllPDFs();
            }
        } catch (err) {
            console.warn('IndexedDB not available (file:// protocol). Only showing built-in e-book.', err);
        }

        const allPDFs = [seededEbook, ...uploadedPDFs];
        
        // Filter by search query
        const filteredPDFs = allPDFs.filter(pdf => 
            pdf.title.toLowerCase().includes(query.toLowerCase()) || 
            pdf.description.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredPDFs.length === 0) {
            emptyEl.classList.remove('hidden');
            return;
        }

        emptyEl.classList.add('hidden');

        filteredPDFs.forEach(pdf => {
            const card = document.createElement('div');
            card.className = 'pdf-card';
            if (pdf.isEbook) {
                card.style.border = '1px solid rgba(0, 200, 83, 0.3)';
                card.style.background = 'linear-gradient(135deg, var(--color-bg-card) 0%, rgba(0, 200, 83, 0.02) 100%)';
            }

            card.innerHTML = `
                <div class="pdf-card-icon-area" ${pdf.isEbook ? 'style="background-color:rgba(0,200,83,0.15);"' : ''}>
                    <i data-lucide="${pdf.isEbook ? 'book-open' : 'file-text'}"></i>
                </div>
                <h3 class="pdf-card-title">${pdf.title} ${pdf.isEbook ? '<span class="badge-status aprobado" style="font-size:0.65rem; padding: 2px 6px; margin-left:6px; vertical-align:middle;">E-Book</span>' : ''}</h3>
                <p class="pdf-card-desc">${pdf.description}</p>
                <div class="pdf-card-meta">
                    <span>Autor: ${pdf.isEbook ? ebookData.author : 'Admin'}</span>
                    <span>${pdf.isEbook ? 'Interactivo' : 'PDF'}</span>
                </div>
                <a href="#plataforma/pdf?id=${pdf.id}" class="btn btn-primary btn-sm" style="margin-top:10px; width:100%;">
                    ${pdf.isEbook ? 'Leer E-Book' : 'Ver Recurso'} <i data-lucide="eye" class="icon-sm"></i>
                </a>
            `;
            grid.appendChild(card);
        });
        renderIcons();
    };

    // ==========================================
    // PDF VIEWER LOGIC (INTEGRATED E-BOOK READER)
    // ==========================================
    const btnBackLibrary = document.getElementById('btn-back-library');
    if (btnBackLibrary) {
        btnBackLibrary.addEventListener('click', () => {
            window.location.hash = '#plataforma/biblioteca';
        });
    }

    const loadPDFInViewer = async (pdfId) => {
        const container = document.getElementById('pdf-viewer-container');
        const ebookContainer = document.getElementById('ebook-reader-container');
        const titleEl = document.getElementById('viewer-pdf-title');
        
        // Revoke any previous Blob URL to prevent memory leaks
        if (window.currentPdfBlobUrl) {
            URL.revokeObjectURL(window.currentPdfBlobUrl);
            window.currentPdfBlobUrl = null;
        }

        // 1. Check if it is the pre-installed interactive E-Book
        if (pdfId === 'matias_ebook') {
            container.classList.add('hidden');
            ebookContainer.classList.remove('hidden');
            
            titleEl.textContent = ebookData.title;
            renderInteractiveEbook();
            return;
        }

        // 2. Otherwise load standard PDF from IndexedDB
        container.classList.remove('hidden');
        ebookContainer.classList.add('hidden');

        container.innerHTML = `
            <div class="text-center" style="padding:60px;">
                <div class="badge-dot" style="width:12px;height:12px;margin-bottom:10px;"></div>
                <p>Cargando archivo PDF...</p>
            </div>
        `;

        try {
            const pdf = await window.pdfDb.getPDF(pdfId);
            if (!pdf) {
                container.innerHTML = `
                    <div class="pdf-viewer-error">
                        <h3 class="text-red">Recurso no encontrado</h3>
                        <p>El archivo PDF solicitado no está disponible.</p>
                    </div>
                `;
                return;
            }

            titleEl.textContent = pdf.title;
            const blobUrl = URL.createObjectURL(pdf.blob);
            window.currentPdfBlobUrl = blobUrl;

            // Embed PDF, disabling toolbar to discourage downloads
            container.innerHTML = `
                <object data="${blobUrl}#toolbar=0&navpanes=0" type="application/pdf" width="100%" height="100%">
                    <embed src="${blobUrl}#toolbar=0&navpanes=0" type="application/pdf" />
                    <div class="pdf-viewer-error">
                        <i data-lucide="file-warning" style="width:40px;height:40px;color:var(--color-primary);margin-bottom:15px;"></i>
                        <p>Tu navegador no soporta la visualización integrada de PDFs.</p>
                        <a href="${blobUrl}" target="_blank" class="btn btn-primary btn-sm mt-lg">Abrir en nueva pestaña</a>
                    </div>
                </object>
            `;
            renderIcons();
            
        } catch (err) {
            console.error('Error rendering PDF:', err);
            container.innerHTML = `
                <div class="pdf-viewer-error">
                    <h3 class="text-red">Error de base de datos</h3>
                    <p>No se pudo recuperar el PDF de la base de datos local.</p>
                </div>
            `;
        }
    };

    // Render interactive eBook contents
    const renderInteractiveEbook = () => {
        const chaptersList = document.getElementById('ebook-chapters-list');
        const contentBody = document.getElementById('ebook-content-body');
        
        chaptersList.innerHTML = '';
        
        ebookData.chapters.forEach((chap, idx) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a class="ebook-chapter-link ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
                    Cap. ${chap.num}: ${chap.title}
                </a>
            `;
            chaptersList.appendChild(li);
        });

        // Set initial chapter content
        setEbookChapter(0);

        // Bind chapter link clicks
        chaptersList.querySelectorAll('.ebook-chapter-link').forEach(link => {
            link.addEventListener('click', (e) => {
                chaptersList.querySelectorAll('.ebook-chapter-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                const idx = parseInt(link.getAttribute('data-idx'));
                setEbookChapter(idx);
            });
        });
    };

    const setEbookChapter = (idx) => {
        const contentBody = document.getElementById('ebook-content-body');
        const chap = ebookData.chapters[idx];
        
        contentBody.innerHTML = `
            <div class="ebook-chapter-header">
                <div class="ebook-chapter-num">Capítulo ${chap.num}</div>
                <h2 class="ebook-chapter-title">${chap.title}</h2>
            </div>
            <div class="ebook-chapter-contents">
                ${chap.content}
            </div>
        `;
        contentBody.scrollTop = 0; // Scroll back to top
        renderIcons();
    };

    // ==========================================
    // ADMIN PANEL DASHBOARD LOGIC
    // ==========================================
    
    const adminTabBtns = document.querySelectorAll('.admin-tab-btn');
    const adminTabContents = document.querySelectorAll('.admin-tab-content');

    adminTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            
            adminTabBtns.forEach(b => b.classList.remove('active'));
            adminTabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const targetEl = document.getElementById(targetId);
            if (targetEl) targetEl.classList.add('active');
            
            if (targetId === 'admin-tab-notifications') {
                const notifications = getNotifications();
                notifications.forEach(n => n.read = true);
                saveNotifications(notifications);
                updateAdminNotificationBadges();
            }
        });
    });

    const loadAdminPanel = () => {
        updateAdminStats();
        loadAdminUsersTable();
        loadAdminPDFsTable();
        loadAdminNotifications();
        updateAdminNotificationBadges();
    };

    const updateAdminStats = () => {
        const users = getUsers().filter(u => u.role !== 'admin');
        const total = users.length;
        const pending = users.filter(u => u.status === 'pendiente').length;
        const approved = users.filter(u => u.status === 'aprobado').length;

        document.getElementById('stat-total-users').textContent = total;
        document.getElementById('stat-pending-users').textContent = pending;
        document.getElementById('stat-approved-users').textContent = approved;
    };

    const updateAdminNotificationBadges = () => {
        const notifications = getNotifications();
        const unreadCount = notifications.filter(n => !n.read).length;
        
        const tabBadge = document.getElementById('admin-notif-badge');
        const usersBadge = document.getElementById('admin-users-badge');
        const pendingCount = getUsers().filter(u => u.status === 'pendiente').length;

        if (unreadCount > 0) {
            tabBadge.textContent = unreadCount;
            tabBadge.classList.remove('hidden');
        } else {
            tabBadge.classList.add('hidden');
        }

        if (pendingCount > 0) {
            usersBadge.textContent = pendingCount;
            usersBadge.classList.remove('hidden');
        } else {
            usersBadge.classList.add('hidden');
        }
    };

    const searchUsersInput = document.getElementById('admin-search-users');
    const filterStatusSelect = document.getElementById('admin-filter-status');

    if (searchUsersInput) {
        searchUsersInput.addEventListener('input', loadAdminUsersTable);
    }
    if (filterStatusSelect) {
        filterStatusSelect.addEventListener('change', loadAdminUsersTable);
    }

    function loadAdminUsersTable() {
        const query = searchUsersInput ? searchUsersInput.value.trim().toLowerCase() : '';
        const statusFilter = filterStatusSelect ? filterStatusSelect.value : 'all';

        const tableBody = document.getElementById('users-table-body');
        tableBody.innerHTML = '';

        const users = getUsers().filter(u => u.role !== 'admin');

        const filteredUsers = users.filter(user => {
            const matchesQuery = user.name.toLowerCase().includes(query) || 
                                 user.email.toLowerCase().includes(query) || 
                                 user.whatsapp.includes(query);
            
            const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
            
            return matchesQuery && matchesStatus;
        });

        if (filteredUsers.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center" style="color:var(--color-text-secondary); padding:30px;">
                        No se encontraron usuarios.
                    </td>
                </tr>
            `;
            return;
        }

        filteredUsers.forEach(user => {
            const tr = document.createElement('tr');
            
            let actionButtons = '';
            if (user.status === 'pendiente') {
                actionButtons = `
                    <button class="btn-icon-only btn-approve btn-action-approve" data-email="${user.email}" title="Aprobar"><i data-lucide="check"></i></button>
                    <button class="btn-icon-only btn-reject btn-action-reject" data-email="${user.email}" title="Rechazar"><i data-lucide="x"></i></button>
                    <button class="btn-icon-only btn-delete btn-action-delete" data-email="${user.email}" title="Eliminar"><i data-lucide="trash-2"></i></button>
                `;
            } else if (user.status === 'aprobado') {
                actionButtons = `
                    <button class="btn-icon-only btn-reject btn-action-reject" data-email="${user.email}" title="Rechazar/Suspender"><i data-lucide="slash"></i></button>
                    <button class="btn-icon-only btn-delete btn-action-delete" data-email="${user.email}" title="Eliminar"><i data-lucide="trash-2"></i></button>
                `;
            } else if (user.status === 'rechazado') {
                actionButtons = `
                    <button class="btn-icon-only btn-approve btn-action-approve" data-email="${user.email}" title="Aprobar"><i data-lucide="check"></i></button>
                    <button class="btn-icon-only btn-delete btn-action-delete" data-email="${user.email}" title="Eliminar"><i data-lucide="trash-2"></i></button>
                `;
            }

            tr.innerHTML = `
                <td>
                    <div style="font-weight:600;">${user.name}</div>
                </td>
                <td>
                    <div class="user-contact-info">
                        <span class="user-email-text">${user.email}</span>
                        <a href="https://wa.me/598${user.whatsapp.replace(/^0/, '')}" target="_blank" class="user-phone-link">
                            <i data-lucide="message-circle" class="icon-sm"></i> ${user.whatsapp}
                        </a>
                    </div>
                </td>
                <td>${user.regDate || 'N/A'}</td>
                <td>
                    <span class="badge-status ${user.status}">${user.status}</span>
                </td>
                <td>
                    <div class="action-buttons">${actionButtons}</div>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        renderIcons();

        tableBody.querySelectorAll('.btn-action-approve').forEach(btn => {
            btn.addEventListener('click', () => updateUserStatus(btn.getAttribute('data-email'), 'aprobado'));
        });
        tableBody.querySelectorAll('.btn-action-reject').forEach(btn => {
            btn.addEventListener('click', () => updateUserStatus(btn.getAttribute('data-email'), 'rechazado'));
        });
        tableBody.querySelectorAll('.btn-action-delete').forEach(btn => {
            btn.addEventListener('click', () => deleteUserAccount(btn.getAttribute('data-email')));
        });
    }

    const updateUserStatus = (email, newStatus) => {
        const users = getUsers();
        const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (userIndex !== -1) {
            users[userIndex].status = newStatus;
            saveUsers(users);
            
            const currentUser = getCurrentUser();
            if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
                currentUser.status = newStatus;
                setCurrentUser(currentUser);
            }
            
            loadAdminPanel();
            alert(`El usuario ${users[userIndex].name} ha sido ${newStatus === 'aprobado' ? 'aprobado' : 'rechazado'} con éxito.`);
        }
    };

    const deleteUserAccount = (email) => {
        if (!confirm('¿Estás seguro de que deseas eliminar permanentemente esta cuenta de usuario?')) {
            return;
        }

        const users = getUsers();
        const filteredUsers = users.filter(u => u.email.toLowerCase() !== email.toLowerCase());
        
        saveUsers(filteredUsers);
        loadAdminPanel();
        alert('El usuario ha sido eliminado correctamente.');
    };

    // PDF Management in Admin
    const pdfForm = document.getElementById('upload-pdf-form');
    const btnCancelPdfEdit = document.getElementById('btn-cancel-pdf-edit');

    const resetPdfForm = () => {
        pdfForm.reset();
        document.getElementById('edit-pdf-id').value = '';
        document.getElementById('pdf-form-title').textContent = 'Subir Nuevo PDF';
        document.getElementById('pdf-file-label').textContent = 'Archivo PDF';
        document.getElementById('pdf-file').required = true;
        document.getElementById('pdf-file-help').textContent = 'Selecciona un archivo PDF local. Máximo recomendado 10MB.';
        btnCancelPdfEdit.classList.add('hidden');
    };

    if (btnCancelPdfEdit) {
        btnCancelPdfEdit.addEventListener('click', resetPdfForm);
    }

    if (pdfForm) {
        pdfForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const editId = document.getElementById('edit-pdf-id').value;
            const title = document.getElementById('pdf-title').value.trim();
            const description = document.getElementById('pdf-desc').value.trim();
            const fileInput = document.getElementById('pdf-file');
            
            const hasNewFile = fileInput.files.length > 0;
            
            if (!editId && !hasNewFile) {
                alert('Por favor selecciona un archivo PDF para subir.');
                return;
            }

            try {
                let pdfObject;

                if (editId) {
                    const existingPdf = await window.pdfDb.getPDF(editId);
                    if (!existingPdf) {
                        alert('No se pudo encontrar el PDF original.');
                        return;
                    }

                    let blob = existingPdf.blob;
                    let fileName = existingPdf.fileName;

                    if (hasNewFile) {
                        const file = fileInput.files[0];
                        if (file.type !== 'application/pdf') {
                            alert('Solo se admiten archivos en formato PDF.');
                            return;
                        }
                        blob = file;
                        fileName = file.name;
                    }

                    pdfObject = {
                        id: editId,
                        title,
                        description,
                        fileName,
                        blob,
                        uploadDate: existingPdf.uploadDate
                    };
                } else {
                    const file = fileInput.files[0];
                    if (file.type !== 'application/pdf') {
                        alert('Solo se admiten archivos en formato PDF.');
                        return;
                    }

                    pdfObject = {
                        id: 'pdf_' + Date.now(),
                        title,
                        description,
                        fileName: file.name,
                        blob: file,
                        uploadDate: new Date().toLocaleDateString('es-ES')
                    };
                }

                await window.pdfDb.savePDF(pdfObject);
                alert(editId ? 'Recurso PDF actualizado con éxito.' : 'Nuevo PDF subido con éxito.');
                resetPdfForm();
                loadAdminPDFsTable();

            } catch (err) {
                console.error('Error saving PDF:', err);
                alert('Ocurrió un error al guardar el PDF en la base de datos.');
            }
        });
    }

    const loadAdminPDFsTable = async () => {
        const pdfsList = document.getElementById('admin-pdfs-list');
        pdfsList.innerHTML = '';

        try {
            // Se muestran los PDFs subidos en IndexedDB. El eBook estático no se lista aquí para evitar que se borre.
            const pdfs = await window.pdfDb.getAllPDFs();

            if (pdfs.length === 0) {
                pdfsList.innerHTML = `
                    <tr>
                        <td colspan="3" class="text-center" style="color:var(--color-text-secondary); padding:20px;">
                            No hay PDFs cargados por el administrador. Sube uno a la izquierda.
                        </td>
                    </tr>
                `;
                return;
            }

            pdfs.forEach(pdf => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>
                        <div style="font-weight:600;">${pdf.title}</div>
                        <div style="font-size:0.75rem; color:var(--color-text-muted); max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                            ${pdf.fileName}
                        </div>
                    </td>
                    <td>${pdf.uploadDate}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon-only btn-edit btn-pdf-edit" data-id="${pdf.id}" title="Reemplazar/Editar"><i data-lucide="edit"></i></button>
                            <button class="btn-icon-only btn-delete btn-pdf-delete" data-id="${pdf.id}" title="Eliminar"><i data-lucide="trash-2"></i></button>
                        </div>
                    </td>
                `;
                pdfsList.appendChild(tr);
            });
            renderIcons();

            pdfsList.querySelectorAll('.btn-pdf-edit').forEach(btn => {
                btn.addEventListener('click', () => startPdfEdit(btn.getAttribute('data-id')));
            });
            pdfsList.querySelectorAll('.btn-pdf-delete').forEach(btn => {
                btn.addEventListener('click', () => deletePdfResource(btn.getAttribute('data-id')));
            });

        } catch (err) {
            console.error('Error rendering Admin PDFs:', err);
            pdfsList.innerHTML = '<tr><td colspan="3" class="text-red">Error al cargar la lista de PDFs.</td></tr>';
        }
    };

    const startPdfEdit = async (id) => {
        try {
            const pdf = await window.pdfDb.getPDF(id);
            if (!pdf) return;

            document.getElementById('edit-pdf-id').value = pdf.id;
            document.getElementById('pdf-title').value = pdf.title;
            document.getElementById('pdf-desc').value = pdf.description;
            
            document.getElementById('pdf-form-title').textContent = 'Modificar / Reemplazar PDF';
            document.getElementById('pdf-file-label').textContent = 'Reemplazar archivo PDF (opcional)';
            document.getElementById('pdf-file').required = false;
            document.getElementById('pdf-file-help').textContent = `Mantener archivo actual (${pdf.fileName}) o seleccionar uno nuevo para reemplazarlo.`;
            
            btnCancelPdfEdit.classList.remove('hidden');
            pdfForm.scrollIntoView({ behavior: 'smooth' });

        } catch (err) {
            console.error('Error fetching PDF details for edit:', err);
        }
    };

    const deletePdfResource = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este recurso PDF de la biblioteca?')) {
            return;
        }

        try {
            await window.pdfDb.deletePDF(id);
            alert('PDF eliminado correctamente.');
            loadAdminPDFsTable();
            const hash = window.location.hash || '#';
            if (hash.includes(id)) {
                window.location.hash = '#plataforma/biblioteca';
            }
        } catch (err) {
            console.error('Error deleting PDF:', err);
            alert('No se pudo eliminar el archivo.');
        }
    };

    // Notifications List in Admin
    const loadAdminNotifications = () => {
        const listContainer = document.getElementById('admin-notifications-list');
        listContainer.innerHTML = '';

        const notifications = getNotifications();

        if (notifications.length === 0) {
            listContainer.innerHTML = `
                <div class="text-center" style="padding:40px; color:var(--color-text-secondary);">
                    <i data-lucide="bell-off" style="width:48px;height:48px;margin-bottom:15px;color:var(--color-text-muted);"></i>
                    <p>No tienes notificaciones de registro recientes.</p>
                </div>
            `;
            renderIcons();
            return;
        }

        notifications.forEach(notif => {
            const card = document.createElement('div');
            card.className = 'notif-card';
            
            const users = getUsers();
            const matchedUser = users.find(u => u.email.toLowerCase() === notif.email.toLowerCase());
            
            let quickActions = '';
            if (matchedUser && matchedUser.status === 'pendiente') {
                quickActions = `
                    <div style="display:flex; gap:8px;">
                        <button class="btn btn-primary btn-sm btn-notif-approve" data-email="${notif.email}" style="padding:8px 12px; font-size:0.75rem;">Aprobar</button>
                        <button class="btn btn-secondary btn-sm btn-notif-reject" data-email="${notif.email}" style="padding:8px 12px; font-size:0.75rem; border-color:#EF4444; color:#EF4444;">Rechazar</button>
                    </div>
                `;
            } else {
                quickActions = `
                    <span class="badge-status ${matchedUser ? matchedUser.status : 'deleted'}">
                        ${matchedUser ? matchedUser.status : 'eliminado'}
                    </span>
                `;
            }

            card.innerHTML = `
                <div class="notif-details">
                    <div class="notif-title">Nuevo registro de usuario</div>
                    <div class="notif-body">
                        <strong>Nombre:</strong> ${notif.name}<br>
                        <strong>Correo:</strong> ${notif.email}<br>
                        <strong>WhatsApp:</strong> <a href="https://wa.me/598${notif.whatsapp.replace(/^0/, '')}" target="_blank" style="color:var(--color-primary);text-decoration:underline;">${notif.whatsapp}</a>
                    </div>
                    <div class="notif-date">Registrado el: ${notif.regDate}</div>
                </div>
                <div class="notif-actions-panel">
                    ${notif.read ? '' : '<span class="badge-status pendiente" style="margin-bottom:8px; display:block; text-align:center;">Nueva</span>'}
                    ${quickActions}
                </div>
            `;
            listContainer.appendChild(card);
        });

        listContainer.querySelectorAll('.btn-notif-approve').forEach(btn => {
            btn.addEventListener('click', () => {
                updateUserStatus(btn.getAttribute('data-email'), 'aprobado');
                loadAdminNotifications();
            });
        });
        listContainer.querySelectorAll('.btn-notif-reject').forEach(btn => {
            btn.addEventListener('click', () => {
                updateUserStatus(btn.getAttribute('data-email'), 'rechazado');
                loadAdminNotifications();
            });
        });
    };

    const clearNotificationsBtn = document.getElementById('btn-clear-notifications');
    if (clearNotificationsBtn) {
        clearNotificationsBtn.addEventListener('click', () => {
            if (confirm('¿Deseas vaciar el historial de notificaciones?')) {
                saveNotifications([]);
                loadAdminNotifications();
                updateAdminNotificationBadges();
            }
        });
    }

    // Call updateHeaderAuthActions on load to reflect auth state
    updateHeaderAuthActions();

});

// ==========================================
// GLOBAL FUNCTIONS (for onclick HTML attributes)
// ==========================================
function openLoginModal() {
    window.location.hash = '#plataforma/login';
}

function openRegisterModal() {
    window.location.hash = '#plataforma/registro';
}

function logoutUser() {
    if (window.currentPdfBlobUrl) {
        URL.revokeObjectURL(window.currentPdfBlobUrl);
        window.currentPdfBlobUrl = null;
    }
    localStorage.removeItem('matias_currentUser');
    window.location.hash = '#';
    // Reload to refresh state
    setTimeout(() => location.reload(), 100);
}
