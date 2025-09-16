// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

for(List<Contact> conlist : [select id,PhotoUrl__c,Rank__c,title from contact]){
  for(Contact con : conlist){
    con.PhotoUrl__c='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fdownload_7937030&psig=AOvVaw0mKQAd0xIiwcf3wHUfyDhk&ust=1752582007041000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNjyj_aqvI4DFQAAAAAdAAAAABAK';
 
    if(String.isBlank(con.title)){
      con.Rank__c =3;
    }else {
      con.Rank__c= 8;
    }
  }
  update conlist;
}