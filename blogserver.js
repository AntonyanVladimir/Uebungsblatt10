const express = require('express');
const app = express();
app.listen(3000, ()=>{console.log('Listening on Port 3000...')});


app.get('/', (req, res)=>{
    res.send('Homepage');
});
app.get('/articles', (req, res)=>{
    if(!(Object.keys(req.query).length === 0)){
        var tagName = req.query.tag;
        var suchwort = req.query.suchwort;
        var artikels;
        if(tagName&&suchwort){
           let artikelsFromTag =getArticlesByTag(tagName, ARTICLES);
           let artikelsFromSuchwort = getArticlesBySearchstring(suchwort, ARTICLES);
           artikels = artikelsFromTag.concat(artikelsFromSuchwort);
           res.send(JSON.stringify(artikels));
        }
        if(tagName){
         artikels= getArticlesByTag(tagName, ARTICLES);
        } else 
        if(suchwort){
           artikels= getArticlesBySearchstring(suchwort, ARTICLES);
        }
        if(!artikels)
        res.status(404).send('Wurde nicht gefunden...');
       res.send(JSON.stringify(artikels));
    }
    else res.send(JSON.stringify(ARTICLES));
});

app.get('/articles/:id', (req, res)=>{
     var artikel = ARTICLES.find(a=>a.id===req.params.id);
    
    if(!artikel){
        res.status(404).send('Artikel Wurde nicht Gefunden.');
    } else {
        res.send(artikel);
    }

});


//Testdaten
const ARTICLES = [
	{
		ueberschrift: 'HTML Dokumente',
		autor: 'Thomas Richter',
		datum: '17. Januar 2018 20:48',
		anriss: 'Eine kurze EinfÃ¼hrung in HTML-Dokumente',
		text: 'HTML Dokumente dienen der Strukturierung von Inhalten, die im Web bzw. mit Webtechnologien wie Internetbrowser und Hypertext Transfer Protocol (HTTP) verbreitet werden sollen. HTML Dokumente bestehen aus HTML-Elementen. Das einfachste HTML5 Dokument ist: <br>'
		+ '<pre>'
		+ '&lt;!DOCTYPE html&gt;\n'
		+ '&lt;html&gt;\n'
		+ '  &lt;head&gt;\n'
		+ '    &lt;title&gt;Titel des Dokuments&lt;/title&gt;\n'
		+ '  &lt;/head&gt;\n'
		+ '  &lt;body&gt;\n'
		+ '  &lt;/body&gt;\n'
		+ '&lt;/html&gt;\n'
		+ '</pre>',
		bild: '',
		tags: ['HTML5', 'Dokument', 'HTTP'],
		id: '12'
	},
	{
		ueberschrift: 'HTML Elemente',
		autor: 'Thomas Richter',
		datum: '16. Januar 2018 21:14',
		anriss: 'Eine kurze EinfÃ¼hrung in HTML Elemente',
		text: 'Die HTML Elemente eines HTML Dokuments sind ineinander geschachtelt und bilden damit eine hierarchische Struktur, einen Baum. Ein Element besteht Ã¼blicherweise aus einem Ã¶ffnenden und einem schlieÃŸenden Tag. Zwischen den beiden Tags befindet sich der eigentliche Inhalt des Elements.<br> Weiterhin kÃ¶nnen im Ã¶ffnenden Tag Attribute in Form von SchlÃ¼ssel-Wert Paaren notiert werden.<br><br>Beispiel: <code>&lt;a href="https://w3.org"&gt;Das ist ein Link auf ein anderes HTML-Dokument (W3C)&lt;/a&gt;</code> wird dargestellt als:<br><br><a href="https://w3.org">Das ist ein Link auf ein anderes HTML-Dokument (W3C)</a>',
		bild: 'baum.png',
		tags: ['HTML5', 'Element'],
		id: '3'
	},	
	{
		ueberschrift: 'Semantische Strukturierung von HTML-Seiten',
		autor: 'Thomas Richter',
		datum: '16. Januar 2018 19:03',
		anriss: 'Ein kurzer Ãœberblick Ã¼ber semantische Elemente in HTML5.',
		text: 'In der Vergangenheit wurden HTML-Dokumente hÃ¤ufig mit Tabellen oder Frames (ok, sehr weit zurÃ¼ckliegende Vergangenheit...) strukturiert. SpÃ¤ter wurden dafÃ¼r <code>&lt;div&gt;</code>-Elemente verwendet. In HTML5 gibt es Elemente, die es erlauben, den einzelnen Teilen des Dokuments eine Semantik zu verleihen, die von modernen Browsern ausgewertet wird und ggf. die Darstellung - z. B. auf MobilgerÃ¤ten und in Readern - beeinflusst. Beispielsweise lÃ¤sst sich ein Dokument mit den Elementen <code>&lt;header&gt;, &lt;main&gt;, &lt;footer&gt;</code> grob in Kopf-, Inhalts- und FuÃŸbereich unterteilen. Weitere semantische Elemente sind <code>&lt;nav&gt;, &lt;aside&gt;, &lt;article&gt;, &lt;section&gt;</code>',
		bild: '',
		tags: ['Semantik', 'HTML5', 'Element'],
		id: '8'
	},	
];


function getArticlesByTag(tag, articles){
	let articlesWithThisTag = [];
	for(let article of articles){
		for(let xTag of article.tags){
			if(xTag.toLowerCase()===tag.toLowerCase())
			articlesWithThisTag.push(article);
		}
	}

	return articlesWithThisTag;
}

let getArticlesBySearchstring = function(searchstring, articles) {
	// Speicher fÃ¼r das Ergebnis
	let articlesWithSearchstring = [];
	
	// case insensitive Suche
	let q = searchstring.toLowerCase();
	
	// Alle Artikel des Arrays durchgehen
	for (let index in articles) {
		// Ist der Suchstring enthalten?
		let article = articles[index];
		if (article.ueberschrift.toLowerCase().includes(q)
			|| article.autor.toLowerCase().includes(q)
			|| article.anriss.toLowerCase().includes(q)
			|| article.text.toLowerCase().includes(q)
			|| article.tags.includes(searchstring)) {
		
			// Artikel in das Ergebnis einfÃ¼gen
			articlesWithSearchstring.push(article);
		}
	}
	
	return articlesWithSearchstring;
}
