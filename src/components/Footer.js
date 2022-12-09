import footer_bg from "../images/footer_bg.png";
import volks from "../images/volks.gif";
// import "./Footer.css";
const Footer = () => {
  return (
    <div>
      <img
        //src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigB8iI5tb8WSVBuVUGc9UjjB8O0708X7Fdic_4O1LT4CmLHoiwhanLXiRhe82yw0R7LgACQ2IhZaTY0hhmGi0gYp_Ynb49CVzfmXtYHUVKgXXpWvJ_oYT8cB4vzsnJLe3iCwuzj-w6PeYq_JaHmy_CoGoa6nw0FBo-2xLdOPvsLTh_fmYH2xhkaZ-OGQ/s16000/footer_bg.png"
        src={footer_bg}
        alt="footerpic"
        style={{ width: "100%", position: "absolute" }}
      />
      <img
        //src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEia0PYPxwT5ifToyP3SNZeQWfJEWrUENYA5IXM6sN5vLwAKvaJS1pQVu8mOFFUa_ET4JuHNTFAxKURFerJYHDUWXLXl1vDofYXuij45JZelYOjEFoCOn7E6Vxu0fwV7ACPzArcno1rYuVxGB7JY6G7__e4_KZW4lTYIaHSLVaVLzklZBLZnQw047oq5-Q/s16000/volks.gif"
        src={volks}
        alt="giffy"
        style={{
          animation: "myfirst 22s linear infinite",
          margin: "5% 25% ",
        }}
      />
    </div>
  );
};
export default Footer;
