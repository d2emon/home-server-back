type DataStrings = { [ key: string ]: string[] }

export interface GeneratorData {
    id: number,
    value: string,
}

const textData = (values: DataStrings) => {
    const data: { [ key: string ]: GeneratorData[] } = Object.keys(values).reduce(
        (d, key) => {
            return {
                ...d,
                [key]: values[key].map((value, id) => ({ id, value })),
            };
        },
        {}
    );
    const randomItem = (groupId: string): GeneratorData => {
        const group: GeneratorData[] = data[groupId] || [];
        return group[Math.floor(Math.random() * group.length)]
    };
    return {
        data,
        randomItem,
        getItem: (groupId: string, itemId: number) => (data[groupId] || [])
            .find(item => (item.id === itemId)),
    }

}

export default textData;
