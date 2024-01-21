const defaultOptions={baseLayers:null,overLayers:null,opacityControl:false};class OpacityControl{#map;#container;#baseLayersOption;#overLayersOption;#opacityControlOption;constructor(options){this.#baseLayersOption=options.baseLayers||defaultOptions.baseLayers;this.#overLayersOption=options.overLayers||defaultOptions.overLayers;this.#opacityControlOption=options.opacityControl||defaultOptions.opacityControl}#radioButtonControlAdd(layerId){const initLayer=Object.keys(this.#baseLayersOption)[0];const radioButton=document.createElement("input");radioButton.setAttribute("type","radio");radioButton.id=layerId;if(layerId===initLayer){radioButton.checked=true;this.#map.setLayoutProperty(layerId,"visibility","visible")}else{this.#map.setLayoutProperty(layerId,"visibility","none")}this.#container.appendChild(radioButton);radioButton.addEventListener("change",(event=>{event.target.checked=true;this.#map.setLayoutProperty(layerId,"visibility","visible");Object.keys(this.#baseLayersOption).map((layer=>{if(layer!==event.target.id){document.getElementById(layer).checked=false;this.#map.setLayoutProperty(layer,"visibility","none")}}))}));const layerName=document.createElement("label");layerName.htmlFor=layerId;layerName.appendChild(document.createTextNode(this.#baseLayersOption[layerId]));this.#container.appendChild(layerName)}#checkBoxControlAdd(layerId){const checkBox=document.createElement("input");checkBox.setAttribute("type","checkbox");checkBox.id=layerId;this.#map.setLayoutProperty(layerId,"visibility","none");this.#container.appendChild(checkBox);checkBox.addEventListener("change",(event=>{if(event.target.checked){this.#map.setLayoutProperty(layerId,"visibility","visible")}else{this.#map.setLayoutProperty(layerId,"visibility","none")}}));const layerName=document.createElement("label");layerName.htmlFor=layerId;layerName.appendChild(document.createTextNode(this.#overLayersOption[layerId]));this.#container.appendChild(layerName)}#rangeControlAdd(layerId){const range=document.createElement("input");range.type="range";range.min=0;range.max=100;range.value=100;this.#container.appendChild(range);range.addEventListener("input",(event=>{this.#map.setPaintProperty(layerId,"raster-opacity",Number(event.target.value/100))}))}#opacityControlAdd(){this.#container=document.createElement("div");this.#container.className="maplibregl-ctrl maplibregl-ctrl-group";this.#container.id="opacity-control";if(this.#baseLayersOption){Object.keys(this.#baseLayersOption).map((layer=>{const layerId=layer;const br=document.createElement("br");this.#radioButtonControlAdd(layerId);this.#container.appendChild(br)}))}if(this.#baseLayersOption&&this.#overLayersOption){const hr=document.createElement("hr");this.#container.appendChild(hr)}if(this.#overLayersOption){Object.keys(this.#overLayersOption).map((layer=>{const layerId=layer;const br=document.createElement("br");this.#checkBoxControlAdd(layerId);this.#container.appendChild(br);if(this.#opacityControlOption){this.#rangeControlAdd(layerId);this.#container.appendChild(br)}}))}}onAdd(map){this.#map=map;this.#opacityControlAdd();return this.#container}onRemove(){this.#container.parentNode.removeChild(this.#container);this.#map=null}}export default OpacityControl;