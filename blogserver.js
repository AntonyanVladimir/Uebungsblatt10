const express = require('express');
const app = express();
const fs = require('fs');
var ARTICLES = [];

var filename = __dirname + '/public/articles.json';
//ggf. vorhandene Daten aus Datei einlesen
try {
    var filedata = fs.readFileSync(filename);
    ARTICLES = JSON.parse(filedata);
    console.log(ARTICLES.length + " Datensätze eingelesen.")
} catch(err) {
    // Datei exisitiert nicht, wir müssen nichts tun
    console.log("Keine Datensätze eingelesen.")
}
/**/
var bodyParser = require('body-parser');
app.use(bodyParser());
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
		   let artikelsFromTag = getArticlesByTag(tagName, ARTICLES);
		   let artikelsFromSuchwort = getArticlesBySearchstring(suchwort, artikelsFromTag);
          
          // artikels = artikelsFromTag.concat(artikelsFromSuchwort);
           res.send(JSON.stringify(artikelsFromSuchwort));
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

app.delete('/articles/:id', (req, res)=>{
	var artikelToBeDeleted = ARTICLES.find(a=>a.id===req.params.id);
	if(!artikelToBeDeleted)
	res.status(404).send('Das Artikel wurde nicht gefunden.');

	const index = ARTICLES.indexOf(artikelToBeDeleted);
	ARTICLES.splice(index, 1);
	res.send('Wrude erfolgreich gelöscht.')
});

app.put('/articles/:id', (req, res)=>{
	var artikelToBeChanged = ARTICLES.find(a =>a.id === req.params.id);
    if(!artikelToBeChanged)
    	res.status(404).send('Das Artikel wurde nicht gefunden');
	
	
	artikelToBeChanged.ueberschrift = req.body.ueberschrift;
	artikelToBeChanged.anriss = req.body.anriss;
	artikelToBeChanged.autor = req.body.autor;
	artikelToBeChanged.bild = req.body.bild;
	artikelToBeChanged.datum = req.body.datum;
	artikelToBeChanged.text = req.body.text;
	artikelToBeChanged.id = req.body.id;
	artikelToBeChanged.tags = req.body.tags;

	res.send(artikelToBeChanged);
});

app.get('/tags', (req, res)=>{
	 var tagMap = new Map();
	
	//alle TagNames als Schlüssel ins Map
	for(let art of ARTICLES){
		for(let tag of art.tags){
			 if(!tagMap.has(tag)){
				tagMap.set(tag, {val:1});
			 }
			
			else{
			  tagMap.get(tag).val++;
				
			}
			 
		}
	}
	var jsonText = JSON.stringify(Array.from(tagMap.entries()));
	res.send(jsonText);

});

