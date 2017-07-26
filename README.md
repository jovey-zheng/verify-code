<h1 align="center">verify-code</h1>

Using canvas to generate a verify code for image. Check the [Live Demo](http://joveyzheng.com/verify-code/).  
Inspiration from [verify-code](https://github.com/KIDx/verify-code).

# Basic usage

```html
<body>
  <img id="code" src="" alt="verify code" />
</body>
...
<script src="./verify-code.min.js"></script>
<script>
var res = verifyCode();
var img =document.getElementById('code');
img.src = res.dataURL;
</script>
```

# Options

  * **width**(*Number*): canvas width (default 90).
  * **height**(*Number*): canvas height (default 30).
  * **baseBackgroundColor**(*String*): canvas background color (default '#fff').
  * **codeLength**(*Number*): verify code length (default: 4).
