import { getDay } from "date-fns";

export default async function trainingDay(data) {

    const today = getDay(new Date());

    const treinoDia = data.find(
        t => t.diaSemana === today
    );

    if (!treinoDia) return null;

    return treinoDia
}
