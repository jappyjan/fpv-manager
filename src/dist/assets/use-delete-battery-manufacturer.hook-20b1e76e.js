import{d as u,r as n,R as i,D as d}from"./index-e705403d.js";function m(){const t=u.useRxDB(),c=n.useCallback(async e=>{const a=await t[i.BATTERIES].find().where("product_line_id").equals(e).exec();await Promise.all(a.map(r=>r.remove()))},[t]),s=n.useCallback(async e=>{const a=await t[i.BATTERY_PRODUCT_LINES].find().where("manufacturer_id").equals(e).exec();await Promise.all(a.map(r=>c(r.id))),await Promise.all(a.map(r=>r.remove()))},[t,c]),o=n.useCallback(async e=>{const a=await t[i.BATTERY_MANUFACTURERS].findOne({selector:{id:e}}).exec();if(!a){console.warn(`Manufacturer with id ${e} not found...`);return}await s(e),await a.remove()},[t,s]);return n.useCallback(async e=>new Promise((a,r)=>{d.dialog.confirm("Are you sure you want to delete this manufacturer and all batteries related to it??",async()=>{try{await o(e),a()}catch(l){r(l)}})}),[t,s])}export{m as u};