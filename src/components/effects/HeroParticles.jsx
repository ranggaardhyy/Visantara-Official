import Particles from "react-tsparticles";

const HeroParticles = () => {
  return (
    <Particles
      style={{
        position: "absolute", // penting untuk mengikuti posisi parent
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 3,
        pointerEvents: "none",
      }}
      params={{
        fullScreen: {
          enable: false
        },
        background: {
          color: {
            value: "transparent"
          }
        },
        particles: {
          number: {
            value: 40,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#ffffff"
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: 0.5,
            random: true
          },
          size: {
            value: 3,
            random: true
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            out_mode: "out"
          }
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "repulse"
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            repulse: {
              distance: 100
            },
            push: {
              particles_nb: 4
            }
          }
        },
        retina_detect: true
      }}
    />
  );
};

export default HeroParticles;
