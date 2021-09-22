/*
-->Bu kod ,arama sekmesindeki araç basligi altinda seçilen aracin plaka,model,model yili,kontakt,firma(var ise),gibi bilgilerin
otomatik olarak doldurulmasi için yazilmistir.
-->Bu kod,KOBIWORX arayüzünde ,form yönetim sekmesi altındaki arama basligi altında "parse" isimli form scripti olarak 
calismaktadır.
*/

/*
Oncelikle database de bulunan verileri kopyalamak icin arama sekmesinde kullanacagimiz degiskenleri tanimliyoruz.
*/
var xxmodelYili;
var xxmodel;
var xxfirma;
var xxkisi;
/*get_relationship_data_finder methodunu kullanarak "arac" adi altinda kayitli bilgileri (model yili,model,firma(var ise) 
ve kontakt bilgisini) tanimladigimiz degiskenler ile esitliyoruz..*/
get_relationship_data_finder('arac','model_year').then((data)=>{xxmodelYili=data});
get_relationship_data_finder('arac','model').then((data)=>{xxmodel=data});
get_relationship_data_finder('arac','company_ref').then((data)=>{xxfirma=data});
get_relationship_data_finder('arac','customer_ref').then((data)=>{xxkisi=data});
/*arac etkieti altindaki bilgileri önce getElementById ile alip,degiskenler ile change etmek için addEventListener 
methodunu kullaniyoruz.*/
document.getElementById('arac').addEventListener('change', (event) => {
/*change ettigimiz veriler su an tanimladigimiz degiskenlerin icinde store ediliyor.Bu store edilen verileri arama
sekmesi altindaki "Arac Plakasi,Arac Modeli,Arac Yili,Kontakt Firma,Konakt" etiketleri altında arac bilgisi 
secildigi zaman(yukleme aninda) gösterilmek üzere ilgili etiketler ile esitleyip bunu ekranda gösteriyoruz*/
    document.getElementById('aracyili').value=xxmodelYili.find(element => element.id == event.target.value).model_year;
    document.getElementById('aracmodeli').value=xxmodel.find(element => element.id == event.target.value).model;
    document.getElementById('gorusulenfirma').value=xxfirma.find(element => element.id == event.target.value).company_ref;
    document.getElementById('kontakt').value=xxkisi.find(element => element.id == event.target.value).customer_ref;
    document.getElementById('aracplaka').value=document.getElementById('arac').options[document.getElementById('arac').selectedIndex].text;
});

/*kullanici tarafindan girilen verileri(data) store etmek ve database e göndermek icin get_reltaionship_data_finder 
adinda 3 paramtereli bir fonksiyon olsuturuyoruz.Olusturdugumuz bu fonksiyon altında Ajax framework kullaniyoruz*/
function get_relationship_data_finder(table_name, column_name, field_name) {
    var ajaxurl = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port +
        "/frameworx/content/get-relationship-data";
    return new Promise((resolve, reject) => {
        $.ajax({
            url: ajaxurl
            , type: 'POST'
            , data: {
                'table_name': table_name
                , 'column_name': column_name
            }
            , success: function(data) {
                resolve(data)
            }
            , error: function(error) {
                reject(error)
            }
        , })
    })
}
