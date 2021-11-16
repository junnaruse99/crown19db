
export default function SearchableText(props: any) {
  var highlight = {
    backgroundColor: '#FFFF00',
    padding: '0px',
  };
  var output: any = [];
  const text = props.children + '';

  if (props.q == null) {
    return <>{text}</>;
  }

  var t = props.q.split(" ");
  var s = ''
  for (var i = 0; i < t.length; i++) {
    if (i != t.length - 1) {
      s += t[i] + '|';
    } else {
      s += t[i];
    }
  }

  const reg = RegExp(s, 'gi');
  let arr;
  var a = 0;
  while ((arr = reg.exec(text)) !== null) {
    var c = reg.lastIndex;
    var b = c - arr[0].length;

    var clean = text.substring(a, b);
    var hlText = text.substring(b, c);

    output.push(<>{clean}</>);
    output.push(<mark style={highlight}>{hlText}</mark>)

    a = c;
  }
  output.push(<>{text.substring(a, text.length)}</>);

  return output;
}
