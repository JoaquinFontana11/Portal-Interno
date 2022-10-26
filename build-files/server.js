// esto soluciona el problema de los archivos estaticos, se tiene que ejecutar en la carpeta build
import { handler } from './handler.js';
import express from 'express';

const app = express();

// add a route that lives separately from the SvelteKit app
app.get('/img/*', express.static('static'));

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

app.listen(3000, () => {
	console.log('listening on port 3000');
});
