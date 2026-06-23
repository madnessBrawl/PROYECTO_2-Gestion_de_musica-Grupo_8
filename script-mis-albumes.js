// Aseguramos que el DOM cargue antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {

    /* ================= DATOS SIMULADOS API DEEZER ================= */
    const mockAlbumes = [
        { id: "22", title: "Golden Experience", artist: { name: "Prince" }, cover_medium: "https://e-cdns-images.dzcdn.net/images/cover/b41a547ca2399203a9f0f977bd0bdfb9/250x250-000000-80-0-0.jpg" },
        { id: "101", title: "Abbey Road", artist: { name: "The Beatles" }, cover_medium: "https://e-cdns-images.dzcdn.net/images/cover/152912a7bd20ec82f0dd7fb3cc92cb62/250x250-000000-80-0-0.jpg" },
        { id: "102", title: "Thriller", artist: { name: "Michael Jackson" }, cover_medium: "https://e-cdns-images.dzcdn.net/images/cover/90afcd190fb0cfd3d19f400fb86af2c6/250x250-000000-80-0-0.jpg" },
        { id: "103", title: "Back in Black", artist: { name: "AC/DC" }, cover_medium: "https://e-cdns-images.dzcdn.net/images/cover/c93fc134b281f62b70f07bfccfc0aeb0/250x250-000000-80-0-0.jpg" },
        { id: "104", title: "Rumours", artist: { name: "Fleetwood Mac" }, cover_medium: "https://e-cdns-images.dzcdn.net/images/cover/b1e2e9bf9baeb20b2e3e571de49c9523/250x250-000000-80-0-0.jpg" },
        { id: "105", title: "Dark Side", artist: { name: "Pink Floyd" }, cover_medium: "https://e-cdns-images.dzcdn.net/images/cover/c96d9255c2763d596bfa8a95885c3948/250x250-000000-80-0-0.jpg" }
    ];

    /* ================= ESTADO Y PERSISTENCIA ================= */
    function obtenerAlbumes() {
        try {
            const datos = localStorage.getItem('favoritosDeezer'); /* Extrae datos locales */
            // Si no hay datos, forzamos la carga del mock
            if (!datos || JSON.parse(datos).length === 0) {
                const inicial = mockAlbumes.map(a => ({ ...a, calificacion: 0 })); /* Añade prop calificacion */
                localStorage.setItem('favoritosDeezer', JSON.stringify(inicial)); /* Guarda en cache */
                return inicial;
            }
            return JSON.parse(datos); /* Retorna los existentes */
        } catch (error) {
            console.error("Error leyendo LocalStorage. Usando datos base.");
            return mockAlbumes.map(a => ({ ...a, calificacion: 0 }));
        }
    }

    function guardarAlbumes(albumes) {
        localStorage.setItem('favoritosDeezer', JSON.stringify(albumes)); /* Actualiza cache */
    }

    /* ================= MANEJO OFFLINE ================= */
    function sincronizarCalificacionOffline(idAlbum, nuevaCalificacion) {
        if (!navigator.onLine) { /* Si no hay internet */
            let cola = JSON.parse(localStorage.getItem('colaOffline')) || [];
            cola.push({ id: idAlbum, calificacion: nuevaCalificacion });
            localStorage.setItem('colaOffline', JSON.stringify(cola));
            console.log("Guardado offline");
        }
    }

    // Listener para cuando regrese el internet
    window.addEventListener('online', () => {
        let cola = JSON.parse(localStorage.getItem('colaOffline')) || [];
        if(cola.length > 0) {
            console.log(`Sincronizando ${cola.length} acciones...`);
            localStorage.removeItem('colaOffline'); /* Limpia la cola */
        }
    });

    /* ================= RENDERIZADO ================= */
    function renderizarTabla(filtroEstrellas = "todos") {
        const cuerpo = document.getElementById("cuerpo-tabla");
        const albumes = obtenerAlbumes();
        cuerpo.innerHTML = ""; /* Limpia tabla antes de dibujar */

        albumes.forEach(album => {
            // Aplica filtro
            if (filtroEstrellas !== "todos" && album.calificacion.toString() !== filtroEstrellas) return;

            const fila = document.createElement("tr");
            
            // Validaciones de seguridad por si el localStorage tiene datos incompletos
            const imgUrl = album.cover_medium || 'imagenes/placeholder.png';
            const nombreArtista = album.artist ? album.artist.name : (album.artist_name || 'Desconocido');
            const tituloAlbum = album.title || 'Sin título';

            // Celda Portada
            const celdaPortada = document.createElement("td");
            celdaPortada.innerHTML = `<img src="${imgUrl}" class="portada-img" alt="Portada">`;
            
            // Celda ID
            const celdaID = document.createElement("td");
            celdaID.textContent = album.id;

            // Celda Álbum
            const celdaTitulo = document.createElement("td");
            celdaTitulo.textContent = tituloAlbum;

            // Celda Artista
            const celdaArtista = document.createElement("td");
            celdaArtista.textContent = nombreArtista;

            // Celda Estrellas
            const celdaEstrellas = document.createElement("td");
            const califActual = album.calificacion || 0;
            
            for (let i = 1; i <= 5; i++) {
                const imgEstrella = document.createElement("img");
                imgEstrella.src = i <= califActual 
                    ? "imagenes/calificacion-estrella-llena.png" 
                    : "imagenes/calificacion-estrella-vacia.png";
                imgEstrella.classList.add("estrella-calificacion");
                imgEstrella.onclick = () => actualizarCalificacion(album.id, i); /* Asigna evento click */
                celdaEstrellas.appendChild(imgEstrella);
            }

            // Pinta la fila completa
            fila.append(celdaPortada, celdaID, celdaTitulo, celdaArtista, celdaEstrellas);
            cuerpo.appendChild(fila);
        });
    }

    function actualizarCalificacion(idAlbum, nuevaCalificacion) {
        const albumes = obtenerAlbumes();
        const indice = albumes.findIndex(a => a.id === idAlbum);
        
        if (indice > -1) {
            albumes[indice].calificacion = nuevaCalificacion;
            guardarAlbumes(albumes); /* Guarda localmente */
            sincronizarCalificacionOffline(idAlbum, nuevaCalificacion); /* Verifica cola offline */
            
            const filtroActual = document.getElementById("filtro-estrellas").value;
            renderizarTabla(filtroActual); /* Refresca UI respetando el filtro */
        }
    }

    /* ================= EVENTOS DE BOTONES ================= */
    
    // Evento del filtro desplegable
    document.getElementById("filtro-estrellas").addEventListener("change", (e) => {
        renderizarTabla(e.target.value);
    });

    // Eventos Modo Oscuro
    const btnModo = document.getElementById("btn-modo");
    const imgModo = document.getElementById("img-modo");
    const textoModo = document.getElementById("texto-modo");

    // Verifica estado previo en memoria
    if (localStorage.getItem("tema") === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        imgModo.src = "imagenes/modo-claro-logo.png";
        textoModo.textContent = "Modo claro";
    }

    // Funcionalidad de cambio de tema
    btnModo.addEventListener("click", () => {
        const esOscuro = document.documentElement.getAttribute("data-theme") === "dark";
        
        if (esOscuro) {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("tema", "light");
            imgModo.src = "imagenes/modo-oscuro-logo.png";
            textoModo.textContent = "Modo oscuro";
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("tema", "dark");
            imgModo.src = "imagenes/modo-claro-logo.png";
            textoModo.textContent = "Modo claro";
        }
    });

    // Inicia dibujando la tabla
    renderizarTabla();
    
});