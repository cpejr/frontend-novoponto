import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons'; 
import { StandByComponent } from './styles';
import { ThemeContext } from '../../context/ThemeProvider';
import logoApical from '../../assets/APICAL.png';

const StandBy = () => {
    const { themeColors } = useContext(ThemeContext);

    const { goBack } = useHistory();

    useEffect(() => {
        function carregou() {
            var elements = document.getElementsByClassName("txt-rotate");
            for (var i = 0; i < elements.length; i++) {
              var toRotate = elements[i].getAttribute("data-rotate");
              var period = elements[i].getAttribute("data-period");
              if (toRotate) {
                new TxtRotate(elements[i], JSON.parse(toRotate), period);
              }
            }
            // INJECT CSS
            var css = document.createElement("style");
            // css.type = "text/css";
            css.innerHTML = ".txt-rotate > .wrap { height: 100px; border-right: 0.18em solid #9fbfb9; border-radius: 5px 5px 5px 5px; }";
            document.body.appendChild(css);
        };
        carregou();
      }, []);

      var TxtRotate = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = "";
        this.tick();
        this.isDeleting = false;
      };
    
      TxtRotate.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
    
        if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
    
        this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";
    
        var that = this;
        var delta = 200 - Math.random() * 100;
    
        if (this.isDeleting) {
          delta /= 2;
        }
    
        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
          this.isDeleting = false;
          this.loopNum++;
          delta = 500;
        }
    
        setTimeout(function () {
          that.tick();
        }, delta);
      };

    return (
        <StandByComponent theme={themeColors}>
            <img src={logoApical} alt="Apical - Consultoria Odontológica" />
            <h1 style={{color: '#fff'}}>
                Somos 
                <span
                    className="txt-rotate"
                    data-period="2000"
                    data-rotate='[ " CPE", " onda amarela", " foda"]'
                ></span>
            </h1>

            <a 
                className="linkGoBack"
                onClick={goBack}
            >   
                <LeftOutlined size={14} />
                Voltar
            </a>
        </StandByComponent>
    );
}

export default StandBy;