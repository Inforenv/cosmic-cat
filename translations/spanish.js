/* jshint esversion: 10 */
const NAMESPACE_MODULE_INFORENV_ES = "Espanol_de_Inforenv";

window[NAMESPACE_MODULE_INFORENV_ES] = {};
(function translation() {
    var language = "es";
    var author = "Inforenv";

    const json = {
        global: {
            browse: "Buscar",
            upload: "Subir",
            help: "Ayuda",
            about: "Acerca de",
            copyright: "Derechos de autor",
            advertising: "Publicidad",
            loading: "Cargando...",
            channel: "Canal",
            seeall: "ver todo",
            search: "Buscar",
            browsechannels: "Buscar canales",
            press: "Prensa y blogs",
            creators: "Creadores & Socios",
        },
        channels: {
            about: "Acerca de %s"
        },
        stats: {
            likesdislikes: "%s Me gusta, %r No me gusta"
        },
        buttons: {
            like: "Me gusta",
            addto: "Añadir a",
            share: "Compartir",
            showmore: "Mostrar mas",
            showless: "Mostrar menos",
            subscribe: "Subscribirse",
            subscribed: "Subscrito",
            unsubscribe: "Desuscribirse",
            post: "Post",
            loadmoresuggestions: "Cargar más sugerencias",
            signin: "Iniciar sesión"
        },
        suggestions: {
            loading: "Cargar más sugerencias..."
        },
        comments: {
            charactersremain: "%s caracteres restantes",
            secondsremain: "%s segundos restantes antes de que puedas publicar",
            loading: "Cargando comentario...",
            allcomments: "Todos los comentarios",
            topcomments: "Comentarios más populares",
            respond: "Responde a este video..."
        },
        tooltip: {
            ilikethis: "Me gusta esto",
            idislikethis: "No me gusta esto",
            addto: "Agregar a favoritos o lista de reproducción",
            share: "Comparte o inserta este video",
            flag: "Marcar como inapropiado",
            statistics: "Mostrar estadísticas de vídeo",
            clicktobe: "Haga clic para recibir notificaciones de nuevos videos de este canal.",
            interactive: "Transcripción interactiva"
        },
        player: {
            mute: "Silenciar",
            unmute: "Desilenciar",
            quality: "Cambiar calidad",
            fullscreen: "Pantalla completa"
        },
        watch: {
            tags: "Etiquetas",
            license: "Licencia",
            uploaderinfo: "Subido por %s el %r",
            category: "Categoria",
            from: "Desde: %s",
            uploadedavideo: "%s subio un video",
            islive: "%s esta en vivo",
            by: "por %s"
        },    
        uploadmonth: {
            jan: "Ene",
            feb: "Feb",
            mar: "Mar",
            apr: "Abr",
            may: "May",
            jun: "Jun",
            jul: "Jul",
            aug: "Ago",
            sep: "Sep",
            oct: "Oct",
            nov: "Nov",
            dec: "Dic"
        },
        about: {
            country: "Pais:",
            membersince: "Unido:",
            viewedcounts: "Vistas:",
            viewedcount: "Visto:",
            sub: "Subscriber:",
            subs: "Subscriptores:"
        },
        customtag: {
            age: "Edad:",
            occupation: "Ocupación:"
        },
        personal: {
            mychannel: "Mi canal",
            videos: "Videos",
            likes: "Likes",
            history: "Historial",
            watchlater: "Ver despues",
            videomanager: "Gestor de vídeo",
            youtubesettings: "Configuraciones de YouTube",
            subscriptions: "Subscripciones",
            profile: "Perfil",
            privacy: "Privacidad",
            settings: "Ajustes",
            signout: "Cerrar sesión",
            switchaccount: "Cambiar de cuenta",
            googleaccount: "Cuenta de Google"
        },
        browse: {
            mostviewed: "Más visto hoy",
            recommended: "Para ti"
        },
        guide: {
            fromyt: "De YouTube",
            trending: "Tendencias",
            popular: "Popular",
            music: "Musica",
            live: "En vivo",
            gaming: "Gaming",
            news: "Noticias",
            sports: "Deportes",
            education: "Educación",
            howto: "Cómo & estilo"
        }
    };
    
    Ciulinations.addTranslation(language, json, author);
})(NAMESPACE_MODULE_INFORENV_ES);
