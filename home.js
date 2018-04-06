var $ = require('testing.js');

exports.handler = {
    "auth":function(m,d){
        $.membership.authenticate(m,d,function(meta, data){
            console.log("on auth data received is ; "+JSON.stringify(data));
            if(data.err){
                if(data.errCode == "1") $.callPage(m,{}, "Mods/Company/add_company_pop", "idleModal");
                else if(data.errCode == "2")$.callPage(m,{}, "Mods/Company/select_company_pop", "idleModal");
                else $.response(meta, data);
                return;
            }
            else{
               $.callPage(meta, data, "master", meta.element);
            }
        });
    },
    "unAvail":function(meta, data){
        if(data.un){
            $.query(meta, "Select lowered_uname from user_tb where lowered_uname = '"+data.un.toLowerCase()+"'", function(m1, d1){
                if(!d1.err){
                    if(d1.length > 0)
                        $.response(m1, {avail:d1[0].lowered_uname});
                    else
                        $.response(m1, {notavail:""});
                }
            });
        }
    }
};