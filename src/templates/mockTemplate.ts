export function mockTemplate(subject: string, body: string): string {
    return `<html>
                <head>
                    <style>
                    body {
                        font-family: 'Arial', sans - serif;
                        background - color: #f4f4f4;
                        color: #333;
                    }
                    p {
                        font - size: 16px;
                        line - height: 1.5;
                        margin - bottom: 15px;
                    }
                    h2 {
                        color: purple;
                    }

                    footer {
                        margin - top: 20px;
                        padding - top: 10px;
                        border - top: 1px solid #ddd;
                        text - align: center;
                        color: #777;
                    }
                    </style>
                </head>

                <body>
                    <h2>${ subject } </h2>
                    <p> ${ body } </p>
                    <footer>
                        <p>& copy; 2023 Tabella.All rights reserved.</p>
                    </footer>
                </body>
            </html>`
}