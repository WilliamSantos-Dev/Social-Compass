export default function calculateTime(date: Date){
    const currentDate = new Date();
    const timeDifference = Math.floor((currentDate.getTime() - date.getTime()) / 60000); 
    if (timeDifference < 1) {
        return "Agora mesmo";
    } else if (timeDifference === 1) {
        return "A 1 minuto atrás";
    } else if (timeDifference < 60) {
        return `A ${timeDifference} minutos`;
    } else if (timeDifference < 120) {
        return "A 1 hora atrás";
    } else if (timeDifference < 1440) {
        const hours = Math.floor(timeDifference / 60);
        return `A ${hours} horas atrás`;
    } else if (timeDifference < 43200) {
        const days = Math.floor(timeDifference / 1440);
        return `A ${days} dias atrás`;
    } else {
        const months = Math.floor(timeDifference / 43200);
        return `A ${months} meses atrás`;
    }
}

