export default function calculateTime(date: Date) {
  const currentDate = new Date();
  const timeDifference = Math.floor((currentDate.getTime() - date.getTime()) / 60000);
  const timeCalc = (value: number, unit: string) =>`${value} ${unit}${value === 1 ? "" : "s"}`;

  if (timeDifference < 1) {
    return "Agora mesmo";
  }
  if (timeDifference === 1) {
    return "A 1 minuto atrás";
  } else if (timeDifference < 60) {
    return timeCalc(timeDifference, "minuto") + " atrás";
  } else if (timeDifference < 120) {
    return "A 1 hora atrás";
  } else if (timeDifference < 1440) {
    return timeCalc(Math.floor(timeDifference / 60), "hora") + " atrás";
  } else if (timeDifference < 43200) {
    return timeCalc(Math.floor(timeDifference / 1440), "dia") + " atrás";
  } else if (timeDifference < 518400) {
    const months = Math.floor(timeDifference / 43200);
    if (months === 1) {return timeCalc(months, "mês") + " atrás";}
    return timeCalc(months, "mêse") + " atrás";
  } else {
    return timeCalc(Math.floor(timeDifference / 518400), "ano") + " atrás";
  }
}
