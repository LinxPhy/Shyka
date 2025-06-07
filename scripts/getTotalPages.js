

function getTotalPages(count, LIMIT) {

    let total_pages = Math.trunc(count / LIMIT)
    const remainder = count % LIMIT

    if (remainder > 0) {
        total_pages += 1
    }

    return total_pages

}

module.exports = {getTotalPages}