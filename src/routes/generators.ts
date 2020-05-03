import express from 'express';
import generators from '../data/generators';
import textData, {GeneratorData} from '../generators/textData';
import log from 'winston';

const router = express.Router();

const realmData = textData({
    name1: generators.realm.name1,
    name2: generators.realm.name2,
    name3: generators.realm.name3,
    name4: generators.realm.name4,
    name5: generators.realm.name5,
    name6: generators.realm.name6,
    name7: generators.realm.name7,
    name8: generators.realm.name8,
    name9: generators.realm.name9,
    name10: generators.realm.name10,
    name11: generators.realm.name11,
    name12: generators.realm.name12,
    name13: generators.realm.name13,
    name14: generators.realm.name14,
    name15: generators.realm.name15,
    name16: generators.realm.name16,
    name17: generators.realm.name17,
    // name18: generators.realm.name18,
    // name19: generators.realm.name19,
    // name20: generators.realm.name20,
    // name21: generators.realm.name21,
});

type ItemsList = { [k: string]: string };

const getItems = (items: { [ k: string ]: number | undefined }): ItemsList => Object.keys(items).reduce(
    (result, groupId) => {
        const item = items[groupId];
        const itemData = (item !== undefined)
            ? realmData.getItem(groupId, items[groupId] - 1)
            : realmData.randomItem(groupId);
        log.debug(JSON.stringify({
            items,
            item,
            itemData,
        }))
        return {
            ...result,
            [groupId]: itemData && itemData.value,
        };
    },
    {},
);

const getPortal = (
    name2?: number,
    name3?: number,
): string => {
    const data = getItems({
        name2,
        name3,
    });
    return `${data.name2} портал, ${data.name3}`;
};

interface World extends GeneratorData {
    positive: boolean;
}

const world = (item: GeneratorData): World => ({
    ...item,
    positive: item.id > 15,
});

const worldDescription = (item: GeneratorData): World => ({
    ...item,
    positive: item.id > 15,
});

router.get('/portal.md', (req: express.Request, res: express.Response) => res
    .send(getPortal() + '\n'));

router.get('/portal.:value2.:value3.md', (req: express.Request, res: express.Response) => res
    .send(getPortal(
        parseInt(req.params.value2 as string, 0) || undefined,
        parseInt(req.params.value3 as string, 0) || undefined,
    ) + '\n'));

router.get('/realm.md', (req: express.Request, res: express.Response) => {
    const randomItemId = (items: any[]) => Math.floor(Math.random() * items.length)
    const valueId = {
        // 17
        prepare: () => randomItemId(generators.realm.prepare),
        start: () => randomItemId(generators.realm.start),
        personality: () => randomItemId(generators.realm.personality),
        opportunities: () => randomItemId(generators.realm.opportunities),
    };
    const data = {
        value1: realmData.randomItem('name1'),
        value2: realmData.randomItem('name2'),
        value3: realmData.randomItem('name3'),
        value4: world(realmData.randomItem('name4')),
        value5: realmData.randomItem('name5'),
        value6: realmData.randomItem('name6'),
        value7: realmData.randomItem('name7'),
        value8: realmData.randomItem('name8'),

        value9: realmData.randomItem('name9'),
        value10: realmData.randomItem('name10'),
        value11: realmData.randomItem('name11'),
        value12: realmData.randomItem('name12'),
        value13: realmData.randomItem('name13'),
        value14: realmData.randomItem('name14'),
        value15: realmData.randomItem('name15'),
        value16: realmData.randomItem('name16'),
        value17: realmData.randomItem('name17'),
        value17b: realmData.randomItem('name17'),
        value17c: realmData.randomItem('name17'),

        prepare: generators.realm.prepare[valueId.prepare()],
        start: generators.realm.start[valueId.start()],
        personality: [
            valueId.personality(),
            valueId.personality(),
            valueId.personality(),
        ].map(itemId => generators.realm.personality[itemId]),
        opportunities: generators.realm.opportunities[valueId.opportunities()],
    }
    if (data.value4.positive) {
        /*
        while(data.value5 > 19) {
            data.value5 = realmData.randomItemId('name5')
        }
         */
    }
    /*
    if (data.value7 < 5) {
        while(data.value8 > 4) {
            data.value8 = realmData.randomItemId('name8')
        }
    }
    if ((data.value7 > 4) && (data.value7 < 10)) {
        while((data.value8 < 5) || (data.value8 > 9)) {
            data.value8 = realmData.randomItemId('name8')
        }
    }
    if ((data.value7 > 9) && (data.value7 < 15)) {
        while((data.value8 < 10) || (data.value8 > 14)) {
            data.value8 = realmData.randomItemId('name8')
        }
    }
    if (data.value7 > 14) {
        while(data.value8 < 15) {
            data.value8 = realmData.randomItemId('name8')
        }
    }
    while(data.value17b === data.value17) {
        data.value17b = realmData.randomItemId('name17')
    }
    while((data.value17c === data.value17b) || (data.value17c === data.value17)) {
        data.value17c = realmData.randomItemId('name17')
    }
    while(data.value20b === data.value20) {
        data.value20b = realmData.randomItemId('name20')
    }
    while((data.value20c === data.value20b) || (data.value20c === data.value20)) {
        data.value20c = realmData.randomItemId('name20')
    }
     */

    while ([
        data.personality[0].id,
    ].indexOf(data.personality[1].id) >= 0) {
        data.personality[1] = generators.realm.personality[valueId.personality()];
    }
    while ([
        data.personality[0].id,
        data.personality[1].id,
    ].indexOf(data.personality[2].id) >= 0) {
        data.personality[2] = generators.realm.personality[valueId.personality()];
    }

    return res
        .send([
            `Вы ${data.value1.value} ${data.value2.value} портал, ${data.value3.value}. `
                + `Сразу за ним вас встречает ${data.value4.value} мир. ${data.value5.value}. ${data.value6.value}. `
                + '\n\n',
            `${data.value7.value}${data.value8.value}. Этот мир ${data.value9.value}${data.value10.value}.`
                + '\n\n\n\n',
            `${data.value11.value} вы ${data.value12.value} of ${data.value13.value}. ${data.value14.value}, `
                + `${data.value15.value}. ${data.value16.value} ${data.value17.value} существ, `
                + `${data.value17b.value} существ, и то, что может быть чем-то вроде ${data.value17c.value} существ.`
                + '\n\n\n\n',
            `${data.start.value} и${data.prepare.value}. У вас есть ${data.personality[0].value}, `
                + `${data.personality[1].value}, и ${data.personality[2].value}, так что ${data.opportunities.value}`
                + '\n\n',
        ].join(''));
});

export default router;
