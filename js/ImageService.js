var ImageService = function() {

    var storage = window.localStorage; // initalize local storage object
    storage.clear();
    var fname_URL = []; // initialize URL for array of {"fileName": entry.toURL()} dictionary
    this.initialize = function() {
        // No Initialization required
        var deferred = $.Deferred();

        deferred.resolve();
        return deferred.promise();
    }


    this.downloadImage=function (imageURL, imageTags) {
        var deferred = $.Deferred();

    var fileTransfer = new FileTransfer();
    var uri = encodeURI(imageURL);

    var my_url_split= imageURL.url_split("/");
    var fileName = my_url_split[my_url_split.length - 1];
    var my_tags_array=imageTags.split(" ").filter(i=>i!=="");
    my_tags_array = Array.from(new Set(my_tags_array)); 


    var fileURL = cordova.file.cacheDirectory + fileName; // where to save
    fileTransfer.download(
    uri, fileURL, function(entry) {
    console.log("download complete: " + entry + " " + entry.toURL());

                for (var i = 0; i < my_tags_array.length; i++){
                    if (!(my_tags_array[i] in storage)){                    // If the tag is not already in local storage then add it
                        storage.setItem(my_tags_array[i], fileName);     // store in localStorage tuples of ("tag", fileName) 
                                                                      // Multiple tags can have the same fileName
                    }
                    else{
                        var item = storage.getItem(my_tags_array[i]);       // Same tag can have multiple fileNames associated with it
                        if (item !== fileName){
                            storage.setItem(my_tags_array[i], item + ";" + fileName)    // ('tag1', "fileName1;fileName2;fileName3")
                        }

                    }

                }
                fname_URL.push( {"file_name": fileName,  "url" : entry.toURL()} );

        },
        function(error) {
        console.log("download error source " + error.source);
        console.log("download error target " + error.target);
        console.log("download error code" + error.code);
        },
        false, {
        headers: {
        "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
        }
        }
        );
        deferred.resolve();
        return deferred.promise();


    }
        this.findByTag = function(searchTag){
        var deferred = $.Deferred();
        var storage_array = [];
        for (var key in storage){
          var storage_values_split = storage.getItem(key).split(";");   // get my array of ['fileName1','fileName2','fileName3']

          for (var i = 0; i < storage_values_split.length; i++){

            storage_array.push({"key":key, "value": storage_values_split[i]}); // Turn storage into an array of dictionaries of the form
                                                                            // [{key: 'tag1', value : fileName1}]
          }

        }


        var tag_filtered = storage_array.filter(function(element){
          var tag = element.key;                                        // filter our storage_array to the tags matching the search tag
          // var FN = element.value;                                    // return our matching array with the tags that match the search tag
          
          return tag.toLowerCase().indexOf(searchTag.toLowerCase()) > -1;
        });

        var results = [];

        for (var i = 0; i < tag_filtered.length; i++){

            var name = tag_filtered[i].value;           // file name


            var temp_array = fname_URL.filter(function(element){

                return name === element.file_name;            // array of single dictionary element where the fileName from a tag_filtered elemet matches the 
                                                                // fileName of fname_URL array of dictionary elements

            });

            if (results.indexOf(temp_array[0]) <= -1) {
                results.push(temp_array[0]);                    // if the dictionary in temp_array is not in results append it
            }


        }

        


        deferred.resolve(results);
        return deferred.promise();


    }

    this.findByFileName = function(name){
        var deferred = $.Deferred();
        var image = null;

        for (var i = 0; i < fname_URL.length; i++){
            if (name === fname_URL[i].file_name){
                image = fname_URL[i]                // Find the dictionary with teh file_name that matches the name that you are looking for
            }
        }

        deferred.resolve(image);
        return deferred.promise();

    }
}