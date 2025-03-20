async function findTimeIntervals(service:string,ammount:number):Promise<number> {
    const response = await fetch('/api/appointments/findIntervals', {
        method: 'POST',
        body: JSON.stringify({service,ammount})
    })
    const timeInterval = await response.json();
    return timeInterval
}
export {
    findTimeIntervals,
}