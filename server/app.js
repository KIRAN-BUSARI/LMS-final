// // import cookieParser from 'cookie-parser';
// // import express from 'express';
// // import { config } from 'dotenv';
// // import cors from 'cors';
// // import morgan from 'morgan';
// // import errorMiddleware from './middlewares/error.middleware.js';
// // config();

// // // Code Editor
// // import http from "http"
// // import fs from "fs"
// // import { Server as SocketServer } from 'socket.io';
// // import path from "path"
// // import chokidar from "chokidar"
// // import pty from "node-pty"

// // const ptyProcess = pty.spawn('bash', [], {
// //     name: 'xterm-color',
// //     cols: 80,
// //     rows: 30,
// //     cwd: process.env.INIT_CWD + '/user',
// //     env: process.env
// // });

// // const app = express();
// // const server = http.createServer(app);
// // const io = new SocketServer({
// //     cors: '*'
// // })

// // io.attach(server);

// // chokidar.watch('./user').on('all', (event, path) => {
// //     io.emit('file:refresh', path)
// // });

// // ptyProcess.onData(data => {
// //     io.emit('terminal:data', data)
// // })

// // io.on('connection', (socket) => {
// //     console.log(`Socket connected`, socket.id)

// //     socket.emit('file:refresh')

// //     socket.on('file:change', async ({ path, content }) => {
// //         await fs.writeFile(`./user${path}`, content)
// //     })

// //     socket.on('terminal:write', (data) => {
// //         console.log('Term', data)
// //         ptyProcess.write(data);
// //     })
// // })

// // app.get('/files', async (req, res) => {
// //     const fileTree = await generateFileTree('./user');
// //     return res.json({ tree: fileTree })
// // })

// // app.get('/files/content', async (req, res) => {
// //     const path = req.query.path;
// //     const content = await fs.readFile(`./user${path}`, 'utf-8')
// //     return res.json({ content })
// // })

// // server.listen(9000, () => console.log(`🐳 Docker server running on port 9000`))

// // async function generateFileTree(directory) {
// //     const tree = {}

// //     async function buildTree(currentDir, currentTree) {
// //         const files = await fs.readdir(currentDir)

// //         for (const file of files) {
// //             const filePath = path.join(currentDir, file)
// //             const stat = await fs.stat(filePath)

// //             if (stat.isDirectory()) {
// //                 currentTree[file] = {}
// //                 await buildTree(filePath, currentTree[file])
// //             } else {
// //                 currentTree[file] = null
// //             }
// //         }
// //     }

// //     await buildTree(directory, tree);
// //     return tree
// // }
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // app.use(
// //     cors({
// //         origin: process.env.CLIENT_URL,
// //         credentials: true
// //     })
// // );

// // app.use(morgan('dev'));
// // app.use(cookieParser());

// // import userRoutes from './routes/userRoutes.js';
// // import courseRoutes from './routes/courseRoutes.js';
// // import paymentRoutes from './routes/paymentRoutes.js';
// // import otherRoutes from './routes/otherRoutes.js';
// // import communityRoutes from './routes/communityRoutes.js';

// // app.use('/api/v1/user', userRoutes);
// // app.use('/api/v1/courses', courseRoutes);
// // app.use('/api/v1/payments', paymentRoutes);
// // app.use('/api/v1/communities', communityRoutes);
// // app.use('/api/v1', otherRoutes);

// // app.all('*', (_req, res) => {
// //     res.status(404).send('OOPS!!! 404 Page Not Found');
// // });

// // app.use(errorMiddleware);

// // export default app;

// import express from "express";
// import http from "http"
// import morgan from "morgan";
// import cookieParser from "cookie-parser";
// import errorMiddleware from './middlewares/error.middleware.js';
// import fs from "fs"
// import { Server as SocketServer } from 'socket.io';
// import path from "path"
// import chokidar from "chokidar"
// import pty from "node-pty"

// const ptyProcess = pty.spawn('bash', [], {
//     name: 'xterm-color',
//     cols: 80,
//     rows: 30,
//     cwd: process.env.INIT_CWD + '/user',
//     env: process.env
// });

// const app = express();
// const server = http.createServer(app);
// const io = new SocketServer({
//     cors: '*' // Update with allowed origin(s) for production
// })

// io.attach(server);

// chokidar.watch('./user').on('all', (event, path) => {
//     io.emit('file:refresh', path)
// });

// ptyProcess.onData(data => {
//     io.emit('terminal:data', data)
// })

// io.on('connection', (socket) => {
//     console.log(`Socket connected`, socket.id)

//     socket.emit('file:refresh')

//     socket.on('file:change', async ({ path, content }) => {
//         try {
//             await fs.writeFile(`./user${path}`, content)
//         } catch (error) {
//             console.error('Error writing file:', error)
//         }
//     })

//     socket.on('terminal:write', (data) => {
//         console.log('Term', data)
//         ptyProcess.write(data);
//     })
// })

// app.get('/files', async (req, res) => {
//     try {
//         const fileTree = await generateFileTree('./user');
//         console.log(fileTree);
//         return res.json({ tree: fileTree })
//     } catch (error) {
//         console.error('Error generating file tree:', error)
//         res.status(500).send('Internal Server Error');
//     }
// })

// app.get('/files/content', async (req, res) => {
//     const path = req.query.path;
//     try {
//         const content = await fs.readFile(`./user${path}`, 'utf-8')
//         return res.json({ content })
//     } catch (error) {
//         console.error('Error reading file:', error)
//         res.status(500).send('Internal Server Error');
//     }
// })

// server.listen(9000, () => console.log(` Docker server running on port 9000`))

// // async function generateFileTree(directory) {
// //     const tree = {}

// //     async function buildTree(currentDir, currentTree) {
// //         const files = await fs.readdir(currentDir)

// //         for (const file of files) {
// //             const filePath = path.join(currentDir, file)
// //             const stat = await fs.stat(filePath)

// //             if (stat.isDirectory()) {
// //                 currentTree[file] = {}
// //                 await buildTree(filePath, currentTree[file])
// //             } else {
// //                 currentTree[file] = null
// //             }
// //         }
// //     }

// //     await buildTree(directory, tree);
// //     return tree
// // }
// // async function generateFileTree(directory) {
// //     const tree = {}

// //     async function buildTree(currentDir, currentTree) {
// //         try {
// //             const files = await fs.promises.readdir(currentDir)

// //             for (const file of files) {
// //                 const filePath = path.join(currentDir, file)
// //                 const stat = await fs.stat(filePath)

// //                 if (stat.isDirectory()) {
// //                     currentTree[file] = {}
// //                     await buildTree(filePath, currentTree[file])
// //                 } else {
// //                     currentTree[file] = null
// //                 }
// //             }
// //         } catch (error) {
// //             console.error('Error reading directory:', error)
// //             // You can handle the error by throwing it or returning an empty array
// //             // throw error;  // Re-throw the error for further handling
// //             // return [];  // Return an empty array in case of error
// //         }
// //     }

// //     await buildTree(directory, tree);
// //     return tree
// // }
// // async function generateFileTree(currentDir, currentTree) {
// //     try {
// //         const files = await fs.promises.readdir(currentDir)

// //         for (const file of files) {
// //             const filePath = path.join(currentDir, file)
// //             const stat = await fs.promises.stat(filePath)

// //             if (stat.isDirectory()) {
// //                 currentTree[file] = {}
// //                 await buildTree(filePath, currentTree[file])
// //             } else {
// //                 currentTree[file] = null
// //             }
// //         }
// //     } catch (error) {
// //         console.error('Error reading directory:', error)
// //         // You can handle the error by throwing it or returning an empty array
// //         // throw error;  // Re-throw the error for further handling
// //         // return [];  // Return an empty array in case of error
// //     }
// // }

// async function generateFileTree(directory, currentTree = {}) {
//     try {
//         const files = await fs.promises.readdir(directory)

//         for (const file of files) {
//             const filePath = path.join(directory, file)
//             const stat = await fs.promises.stat(filePath)

//             if (stat.isDirectory()) {
//                 currentTree[file] = {} // Create an empty object for subdirectories
//                 await buildTree(filePath, currentTree[file])
//             } else {
//                 currentTree[file] = null
//             }
//         }
//     } catch (error) {
//         console.error('Error reading directory:', error)
//         // You can handle the error by throwing it or returning an empty array
//         // throw error;  // Re-throw the error for further handling
//         // return [];  // Return an empty array in case of error
//     }

//     return currentTree;
// }
// // ... other app configuration (middleware, routes, error handling)

// app.use(morgan('dev'));
// app.use(cookieParser());

// import userRoutes from './routes/userRoutes.js';
// import courseRoutes from './routes/courseRoutes.js';
// import paymentRoutes from './routes/paymentRoutes.js';
// import otherRoutes from './routes/otherRoutes.js';
// import communityRoutes from './routes/communityRoutes.js';

// app.use('/api/v1/user', userRoutes);
// app.use('/api/v1/courses', courseRoutes);
// app.use('/api/v1/payments', paymentRoutes);
// app.use('/api/v1/communities', communityRoutes);
// app.use('/api/v1', otherRoutes);

// app.all('*', (_req, res) => {
//     res.status(404).send('OOPS!!! 404 Page Not Found');
// });

// app.use(errorMiddleware);

// export default app;

import express from "express";
import http from "http";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorMiddleware from './middlewares/error.middleware.js';
import fs from "fs/promises"; // Using fs promises API
import { Server as SocketServer } from 'socket.io';
import path from "path";
import chokidar from "chokidar";
import pty from "node-pty";
import cors from "cors";
const ptyProcess = pty.spawn('bash', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.INIT_CWD + '/user',
    env: process.env
});

const app = express();
const server = http.createServer(app);
const io = new SocketServer({
    cors: '*'
});
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
io.attach(server);

chokidar.watch('./user').on('all', (event, path) => {
    io.emit('file:refresh', path);
});

ptyProcess.onData(data => {
    io.emit('terminal:data', data);
});

io.on('connection', (socket) => {
    console.log(`Socket connected`, socket.id);

    socket.emit('file:refresh');

    socket.on('file:change', async ({ path, content }) => {
        try {
            await fs.writeFile(`./user${path}`, content);
        } catch (error) {
            console.error('Error writing file:', error);
            socket.emit('file:error', error.message); // Emitting error back to the client
        }
    });

    socket.on('terminal:write', (data) => {
        console.log('Term', data);
        ptyProcess.write(data);
    });
});

app.get('/files', async (req, res) => {
    try {
        const fileTree = await generateFileTree('./user');
        console.log(fileTree);
        return res.json({ tree: fileTree });
    } catch (error) {
        console.error('Error generating file tree:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/files/content', async (req, res) => {
    const filePath = req.query.path;
    try {
        const content = await fs.readFile(`./user${filePath}`, 'utf-8');
        return res.json({ content });
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).send('Internal Server Error');
    }
});

server.listen(9000, () => console.log(` Docker server running on port 9000`));

async function generateFileTree(directory, currentTree = {}) {
    try {
        const files = await fs.readdir(directory);

        for (const file of files) {
            const filePath = path.join(directory, file);
            const stat = await fs.stat(filePath);

            if (stat.isDirectory()) {
                currentTree[file] = {}; // Create an empty object for subdirectories
                await generateFileTree(filePath, currentTree[file]); // Recursively generate tree for subdirectories
            } else {
                currentTree[file] = null;
            }
        }
    } catch (error) {
        console.error('Error reading directory:', error);
        // Throw error to propagate it up to the caller
        throw error;
    }

    return currentTree;
}

// ... other app configuration (middleware, routes, error handling)

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ // To make understand express the encoded url
    limit: "16kb", extended: true
}))
app.use(express.static("public")) // To store any public assests in server (Temp


import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import otherRoutes from './routes/otherRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import todoRoutes from "./routes/todoRoutes.js";
import levelRoutes from "./routes/levelRoutes.js";
import lammaRoutes from "./routes/lammaRoutes.js";

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/communities', communityRoutes);
app.use('/api/v1/todo', todoRoutes);
app.use('/api/v1/level', levelRoutes);
app.use('/api/v1/question', lammaRoutes)
app.use('/api/v1', otherRoutes);

app.all('*', (_req, res) => {
    res.status(404).send('OOPS!!! 404 Page Not Found');
});

app.use(errorMiddleware);

export default app;
