html2xml = (function(){
/** html2xml - generic (x)HTML to XML transformer
 * @author      Andrea Giammarchi
 * @license     Mit Style License
 * @blog        http://webreflection.blogspot.com/
 * @project     http://code.google.com/p/css2xpath/
 * @version     0.1 alpha
 */
function html2xml(xml, parent, dom){
    for(var
        childNodes  = dom.childNodes,
        length      = childNodes.length,
        i           = 0,
        node;
        i < length;
        ++i
    ){
        switch((node = childNodes[i]).nodeType){
            case    1:
                for(var
                    xnode       = xml.createElement(node.nodeName.replace(/\//g, "").toLowerCase()),
                    attributes  = node.attributes,
                    len         = attributes.length,
                    j           = 0,
                    attr;
                    j < len;
                    ++j
                ){
                    if((attr = attributes[j]).specified && /^[a-zA-Z_:][-a-zA-Z0-9_:.]*$/.test(attr.nodeName) && attr.nodeValue)
                        xnode.setAttribute(attr.nodeName, attr.nodeValue);
                };
                parent.appendChild(xnode);
                if(node.firstChild)
                    html2xml(xml, xnode, node);
                break;
            case    3:
                parent.appendChild(xml.createTextNode(node.nodeValue));
                break;
        };
    };
    return xml;
};
return function(dom){
    if(this.ActiveXObject){
        var xml = new ActiveXObject("Microsoft.XMLDOM");
        xml.setProperty("SelectionLanguage", "XPath");
    } else
        var xml = document.implementation.createDocument("", "", null);
    return html2xml(xml, xml.appendChild(xml.createElement("html")), dom);
};
})();