const generateSelectValues = (start, end, step) => {
    let output = []
    for (let i = start; i <= end; i += step) {
        let round = i.toFixed(2)
        let plus = ''
        if(i > 0){
            plus = '+'
        }
        output.push(plus + round.toString())
    }
    return output
}

export default generateSelectValues