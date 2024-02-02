const saveToRecent = (alias : string) => {

    try {

        const newAlias = alias.toLocaleLowerCase()
        const getItems = localStorage.getItem("Items")
        const list : any = getItems && getItems.split(',') ? getItems.split(',') : getItems || []

        if (list.includes(newAlias)){
            const list2 = list.filter((val : any) => val != newAlias)
            const newList = [newAlias].concat(list2)
            localStorage.setItem("Items", newList.toString())
        } else {

            if (list.length > 4){
                list.pop()
                list.unshift(newAlias)
                localStorage.setItem("Items", list.toString())
                
            } else {

                list.push(newAlias)
                localStorage.setItem("Items", list.toString())
            }
            
        }

    } catch(e : any) {
        console.log(e)
    }


}

export default saveToRecent