import fs from 'node:fs';

const filePath = './db/data.json';

export function guardarDB (data) {
    fs.writeFileSync(filePath, JSON.stringify(data));
}

export function leerDB() {
    if (!fs.readFileSync(filePath)) {
        return null;
    }
    const info =  fs.readFileSync(filePath, {encoding: 'utf-8'});
    const data = JSON.parse(info) 
    return data; 
}