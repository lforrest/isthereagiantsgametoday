<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="1038.35">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Courier}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Courier; min-height: 14.0px}
    span.Apple-tab-span {white-space:pre}
  </style>
</head>
<body>
<p class="p1">EXAMPLE JAVASCRIPT</p>
<p class="p2"><br></p>
<p class="p1">function mfbttime() {</p>
<p class="p1">now=new Date();</p>
<p class="p1">hour=now.getHours();</p>
<p class="p1">min=now.getMinutes();</p>
<p class="p1">sec=now.getSeconds();</p>
<p class="p1">day=now.getDay();</p>
<p class="p2"><br></p>
<p class="p1">if ( (day &gt; 0 &amp;&amp; day &lt; 6) &amp;&amp; (hour &lt; 17 &amp;&amp; hour &gt; 7) ) {<span class="Apple-converted-space"> </span></p>
<p class="p1"><span class="Apple-tab-span">	</span>mfbt_content = '&lt;p class="no"&gt;NO. Get back to work.&lt;/p&gt;';</p>
<p class="p1">} else {</p>
<p class="p1"><span class="Apple-tab-span">	</span>mfbt_content = '&lt;p&gt;&lt;a href="http://www.flickr.com/photos/tags/mfbt/interesting/"&gt;&lt;img src="LOLKEV.jpg" width="630" height="427" alt="LOLKEV"&gt;&lt;/a&gt;&lt;/p&gt;';<span class="Apple-tab-span">	</span></p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">if (document.getElementById) { document.getElementById('theTime').innerHTML = mfbt_content; }</p>
<p class="p1">else if (document.layers) {</p>
<p class="p1">document.layers.theTime.document.write(mfbt_content);</p>
<p class="p1">document.layers.theTime.document.close(); }</p>
<p class="p2"><br></p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">window.onload = mfbttime();</p>
</body>
</html>
