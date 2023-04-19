export function monthDate(date: Date){
    const oldDate = new Date(date)
    const currentDate = new Date()

    let result = oldDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    if (currentDate.getFullYear()!== oldDate.getFullYear()){
        result = oldDate.toLocaleString('en-US', { weekday: "long", month: "long", year: "numeric"})
    }else if (currentDate.getMonth() !== oldDate.getMonth()){
        oldDate.toLocaleString('en-US', {month: "long", hour: 'numeric', minute: 'numeric', hour12: true })
    } 
    
    return result
}

export function joinDate(date: Date){
    const join_date = new Date(date)
    
    return join_date.toLocaleString('en-US', { weekday: "long", month: "long", year: "numeric"})
}