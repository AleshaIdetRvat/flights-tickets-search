const prettyDateAndTime = (strDate) => {
    const standardDate = new Date(strDate)

    var options = {
        day: "numeric",
        month: "short",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
    }

    const date = standardDate.toLocaleString("ru", options)

    return {
        time: date.slice(-5),
        date: date.substr(4, 7) + " " + date.substr(0, 2),
    }
}

export { prettyDateAndTime }
