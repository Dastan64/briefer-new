export const adapter = (data) => {
    let info = [];
    Object.keys(data).forEach(key => {
        const subSections = Object.keys(data[key]).map(subsection => {
            const tasks = Object.keys(data[key][subsection]).map(task => {
                return {
                    taskTitle: task,
                    taskTime: data[key][subsection][task]?.days,
                    taskDescription: data[key][subsection][task]?.example,
                }
            })
            return {
                subsectionTitle: subsection,
                tasks: tasks,
            }
        })
        const obj = {
            sectionTitle: key,
            subsections: subSections,
        }
        info.push(obj);
    })
    return info;
}



