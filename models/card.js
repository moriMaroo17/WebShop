import path from "path"
import fs from "fs"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const p = path.join(
    __dirname,
    '..',
    'data',
    'card.json'
)


class Card {
    
    static async add(course) {
        const card = await Card.fetch()

        const idx = card.courses.findIndex(c => c.id === course.id)
        const candidate = card.courses[idx]

        if (candidate) {
            // already in card
            candidate.count++
            card.courses[idx] = candidate
        } else {
            // need to add in card
            course.count = 1
            card.courses.push(course)
        }

        card.price += +course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }
}

export { Card }