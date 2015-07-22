We could need a CSS to XPath selector transformer and via JavaScript, of course!

> ... well, that's it about this project, except the fact its size minified and gzipped is less than 1Kb :)

```
var xpathselector = css2xpath(
    "div#test .note span:first-child"
);

/* xpathselector will be the string */

//div[@id='test']//*[contains(concat(' ',normalize-space(@class),' '),' note ')]//*[1]/self::span
```