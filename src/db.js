import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('post.db')

export class DB {
    static init() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT, date TEXT, bookmarked INT)',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }
    
    static getPosts() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM posts',
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static createPost({ text, date, img, bookmarked }) {
        // где то в блоке ошибка не пойми где
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO posts (text, date, img, bookmarked) VALUES (?, ?, ?, ?)',
                    [text, date, img, 0],
                    (_, result) = resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static updatePost(post) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE posts SET bookmarked = ? WHERE id = ?',
                    [post.bookmarked ? 0 : 1, post.id],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static removePost(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM posts WHERE id = ?',
                    [id],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
}