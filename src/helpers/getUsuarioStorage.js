export const getUsuarioStorage = () => {
    return {
        agente: localStorage.getItem('agente') || null,
        escritorio: localStorage.getItem('escritorio') || null,
    }
}