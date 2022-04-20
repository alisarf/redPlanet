/* Takes NodeList and returns Array Type */

function nodeList_to_Array(className, reqInputs = false) {
  var arr = document.getElementsByClassName(className);
  //obj into array
  arr = Array.prototype.slice.call(arr).map(function (element) {
    return reqInputs == true
      ? { id: element.id, input: element.value }
      : element;
    //return element;
  });
  return arr;
}
