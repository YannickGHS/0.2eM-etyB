var Context = {
    canvas: null,
    ctx: null,
    create: function(canvas_tag){
      this.canvas = document.getElementById(canvas_tag);
      this.ctx = this.canvas.getContext("2d");
      return this.ctx;
    }
  };
 function secret(){
      Context.create('canvas');
      var count = 0;
      var count2 = 0;
      var i = 0;
      var radius = 0;
      var t = 0;
      var colors =  ["#52B6E0", "#5ABAE2", "#63BEE4", "#6BC1E5", "#74C5E7", "#7CC9E9", "#85CDEA", "#8ED1EC", "#97D4ED", "#9FD8EE", "#A8DCF0", "#B1DFF2", "#B9E2F3", "#C2E6F5", "#CAE9F6", "#D3EDF8", "#DCF1F9", "#E5F5FB", "#EDF8FC", "#F6FCFE", "#EDF8FC", "#E5F5FB", "#E5F5FB",  "#EDF8FC", "#F6FCFE", "#EDF8FC", "#E5F5FB", "#DCF1F9", "#D3EDF8", "#CAE9F6", "#C2E6F5", "#B9E2F3", "#B1DFF2", "#A8DCF0", "#9FD8EE", "#97D4ED", "#8ED1EC", "#85CDEA", "#7CC9E9", "#74C5E7", "#6BC1E5",  "#63BEE4", "#5ABAE2", "#52B6E0"];
      
      setInterval(function(){
      Context.canvas.width = window.innerWidth;
      Context.canvas.height = window.innerHeight;
      centerx = Context.canvas.width / 2;
      centery = Context.canvas.height / 2;
        Context.ctx.beginPath();
       Context.ctx.rect(0,0,Context.canvas.width, Context.canvas.height);
       Context.ctx.fillStyle = colors[i]; 
        Context.ctx.fill(); 
        count += 1;
        if (count == 8) {
           i++;
           count = 0;
        }
        if (i == colors.length) {
           i = 0;
        }
        Context.ctx.beginPath();
       Context.ctx.arc(centerx,centery,radius,0,2*Math.PI,false);
       Context.ctx.fillStyle = "#6e0a87";
        Context.ctx.fill();
        if (radius == 170) {
           t = 1;
        }
        if (radius == 0) {
           t = 0;
        }
        if (t == 0) {
           radius += 0.5;
        }
        if (t == 1) {
           radius -= 0.5;
        }
      Context.ctx.beginPath();
      Context.ctx.arc(centerx,centery,25,0,2*Math.PI,false);
      Context.ctx.stroke();	
      
      Context.ctx.beginPath();
      Context.ctx.arc(centerx,centery,140,0,2*Math.PI,false);
      Context.ctx.stroke();
      
      count2 += 1;
      if (count2 < 1000) {
      Context.ctx.fillStyle = "blue";
      Context.ctx.font = "bold 50px Arial";
      Context.ctx.textAlign = 'center';
      Context.ctx.fillText("You can do it", centerx + 10, 50);
      }
      if (count2 > 1000 && count2 < 2000) {
      Context.ctx.fillStyle = "blue";
      Context.ctx.font = "bold 50px Arial";
      Context.ctx.textAlign = 'center';
      Context.ctx.fillText("Don't let the little things get to you.", centerx + 10, 50);
      }
      if (count2 > 2000 && count2 < 3000) {
      Context.ctx.fillStyle = "blue";
      Context.ctx.font = "bold 50px Arial";
      Context.ctx.textAlign = 'center';
      Context.ctx.fillText("You're more than the mistakes you've made.", centerx + 10, 50);
      }
      if (count2 > 3000 && count2 < 4000) {
      Context.ctx.fillStyle = "blue";
      Context.ctx.font = "bold 50px Arial";
      Context.ctx.textAlign = 'center';
      Context.ctx.fillText("Life is short, stop worrying about what might happen.", centerx + 10, 50);
      }
      if (count2 == 4000) {
      count2 = 0;
      }
      },20);
      
  };