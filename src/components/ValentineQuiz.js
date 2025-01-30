'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Heart, Stars, ArrowRight, CheckCircle2 } from 'lucide-react';
import * as THREE from 'three';
import { Particles } from './Particles';

const ValentineQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showFinal, setShowFinal] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const mountRef = useRef(null);
  const heartShapes = useRef([]);

  const questions = [
    {
      question: "What's your favorite person's and love of your life's name?",
      options: ["Ali", "Ali", "Ali", "Ali"],
      correctAnswer: "Ali",
      message: "Just making sure..."
    },
    {
      question: "Where did we have our first date?",
      options: ["Charcoal Steak House", "Charcoal Grill Steak House", "Coals Steak House", "E2"],
      correctAnswer: "E2",
      message: "'Charcoal Steak House' is also kinda right but I consider E2 to be our first date, because that's when I asked you (out) to be my partner. I hope you realised that by partner I meant life partner."
    },
    {
      question: "What movie did we watch the first time I stayed over?",
      options: ["Midsommar", "Hereditary", "The Ritual", "Don't Look Up"],
      correctAnswer: "The Ritual",
      message: "We watched Don't Look Up the first time, the horror movie (The Ritual) was the second time. I kept trying to tell you how good this movie was and you weren't paying attention 🙄. To be honest, I was really considering whether I should make a move but I was too nervous because I wasn't sure if you were into me 🤣. But the second time you invited me over, it became obvious (also I decided I was going to make it happen by insisting we watch a horror movie)."
    },
    {
      question: "What song did I put on the first morning after I slept in your bed?",
      options: ["Espresso", "My Boo", "The Color Violet", "Dilemma"],
      correctAnswer: "My Boo",
      message: "I remember this so well because I was singing it and you started laughing when I put this on. I put it on because I thought it was very fitting, considering you are my boo for life <3."
    },
    {
      question: "Which restaurant did we go to in Dubai?",
      options: ["Sushi Samba", "Three Bistro", "OPAL", "Two Bistro"],
      correctAnswer: "Two Bistro",
      message: "I don't need to explain this one, the food was so good I shouldn't even have to remind you. I will say, that whole day in Dubai Mall, it genuinely felt like I was walking beside royalty. You looked so pretty words cannot capture it oh my daysssssssssss. I was missing you so much too, seeing you then genuinely made my entire trip. I love you Nouran."
    }
  ];


  useEffect(() => {
    if (!mountRef.current) return;

    let animationFrameId;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    
    try {
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      // Enhanced lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xffd1e8, 1);
      mainLight.position.set(5, 5, 5);
      scene.add(mainLight);

      const backLight = new THREE.DirectionalLight(0xff69b4, 0.5);
      backLight.position.set(-5, 5, -5);
      scene.add(backLight);

      camera.position.z = 5;

      // Create floating photo
      const createPhoto = async (imagePath) => {
        const textureLoader = new THREE.TextureLoader();
        
        // Load your image - replace with your image path
        const texture = await new Promise((resolve) => {
          textureLoader.load(imagePath, resolve);
        });

        const aspectRatio = texture.image.width / texture.image.height;
        const width = 1; // Base width of the photo
        const height = width / aspectRatio;

        const geometry = new THREE.PlaneGeometry(width, height);
        const material = new THREE.MeshBasicMaterial({ 
          map: texture,
          transparent: true,
          opacity: 0.9,
          side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(geometry, material);

        // Random position
        const x = Math.random() * 12 - 6;
        const y = Math.random() * 12 - 6;
        const z = Math.random() * 6 - 3;
        
        mesh.position.set(x, y, z);
        mesh.rotation.x = Math.random() * Math.PI * 0.1; // Slight tilt
        mesh.rotation.y = Math.random() * Math.PI * 0.1;

        // Add custom properties for animation
        mesh.userData.floatSpeed = 0.001 + Math.random() * 0.002;
        mesh.userData.rotateSpeed = 0.001 + Math.random() * 0.002;
        mesh.userData.phaseOffset = Math.random() * Math.PI * 2;
        
        scene.add(mesh);
        return mesh;
      };

      // Create photo instances
      const photos = [];
      const createPhotos = async (imagePath) => {
        for (let i = 0; i < 7; i++) { // Create 5 floating photos
          const photo = await createPhoto(imagePath);
          photos.push(photo);
        }
      };
      
      let aliImagePath = "/images/ali.png" 
      let nouranImagePath = "/images/nouran.png" 

      // Call createPhotos
      createPhotos(aliImagePath);
      createPhotos(nouranImagePath);


      // Keep existing heart creation code...
      const createHeart = () => {
        const x = Math.random() * 12 - 6;
        const y = Math.random() * 12 - 6;
        const z = Math.random() * 6 - 3;
        
        const heartShape = new THREE.Shape();
        
        // Improved heart curve
        heartShape.moveTo(0, 0);
        heartShape.bezierCurveTo(0, 1.2, -1.5, 2, -1.5, 3);
        heartShape.bezierCurveTo(-1.5, 4, 0, 4.5, 0, 3);
        heartShape.bezierCurveTo(0, 4.5, 1.5, 4, 1.5, 3);
        heartShape.bezierCurveTo(1.5, 2, 0, 1.2, 0, 0);
        
        const extrudeSettings = {
          depth: 0.25,
          bevelEnabled: true,
          bevelSegments: 8,
          steps: 2,
          bevelSize: 0.1,
          bevelThickness: 0.1
        };
        
        const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
        
        // Create gradient-like effect with multiple materials
        const materials = [
          new THREE.MeshPhongMaterial({ 
            color: 0xff69b4,
            shininess: 100,
            specular: 0xffffff,
            transparent: true,
            opacity: 0.9
          }),
          new THREE.MeshPhongMaterial({ 
            color: 0xff1493,
            shininess: 100,
            specular: 0xffffff,
            transparent: true,
            opacity: 0.9
          })
        ];
        
        const mesh = new THREE.Mesh(geometry, materials);
        mesh.position.set(x, y, z);
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.scale.set(0.15, 0.15, 0.15);
        
        // Add custom properties for animation
        mesh.userData.floatSpeed = 0.001 + Math.random() * 0.002;
        mesh.userData.rotateSpeed = 0.002 + Math.random() * 0.003;
        mesh.userData.phaseOffset = Math.random() * Math.PI * 2;
        
        scene.add(mesh);
        return mesh;
      };

      for (let i = 0; i < 20; i++) {
        heartShapes.current.push(createHeart());
      }

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        
        const time = Date.now() * 0.001;
        
        // Animate hearts
        heartShapes.current.forEach((heart, index) => {
          heart.rotation.y += heart.userData.rotateSpeed;
          heart.rotation.z = Math.sin(time * 0.5 + heart.userData.phaseOffset) * 0.1;
          heart.position.y += Math.sin(time + heart.userData.phaseOffset) * heart.userData.floatSpeed;
          heart.position.x += Math.cos(time * 0.5 + heart.userData.phaseOffset) * heart.userData.floatSpeed * 0.5;
          
          if (heart.position.y > 6) {
            heart.position.y = -6;
          }
        });

        // Animate photos
        photos.forEach((photo) => {
          photo.rotation.y += photo.userData.rotateSpeed * 0.5;
          photo.position.y += Math.sin(time + photo.userData.phaseOffset) * photo.userData.floatSpeed * 0.5;
          photo.position.x += Math.cos(time * 0.5 + photo.userData.phaseOffset) * photo.userData.floatSpeed * 0.25;

          // Reset position if photo goes too high
          if (photo.position.y > 6) {
            photo.position.y = -6;
          }
        });
        
        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        if (mountRef.current?.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
        scene.clear();
      };
    } catch (error) {
      console.error("Error in Three.js setup:", error);
    }
  }, []);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    setAnswers([...answers, selectedAnswer]);
    setShowFeedback(false);
    setSelectedAnswer(null);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowFinal(true);
    }
  };

  const FeedbackScreen = () => (
    <div className="space-y-6 animate-fade-in">
          <Particles type="sparkle" />

      <div className="flex items-center space-x-3 text-green-600">
        <CheckCircle2 className="w-8 h-8" />
        <p className="text-xl font-medium">
          {selectedAnswer === questions[currentStep].correctAnswer 
            ? "You got it right yay! I'm proud of you!!!!!!! 🎉" 
            : `Actually, it was "${questions[currentStep].correctAnswer}", but that's okay (😒)`}
        </p>
      </div>
      
      <div className="bg-pink-50 p-6 rounded-xl border-2 border-pink-100">
        <div className="flex items-start space-x-4">
          <Heart className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
          <p className="text-gray-700 text-lg">
            {questions[currentStep].message}
          </p>
        </div>
      </div>

      <button
        onClick={handleContinue}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl text-lg font-medium transition-all duration-300 mt-4"
      >
        {currentStep < questions.length - 1 ? "Next Question" : "See Final Message"}
      </button>
    </div>
  );

  const createCalendarFile = () => {
    // Calendar event details
    const event = {
      title: "ali and nouran go on a super romantic valentine's day date!",
      description: "Mwahat my love. I'm super looking forward to it!!!!!! I would tell you to dress well, but you always do. (dress the same way you did our first date). I've made us reservations, with some backups too <3.",
      // Update these details for your specific date plan
      startDate: "2025027T180000", // Feb 14, 2024, 6:00 PM
      endDate: "2025027T220000",   // Feb 14, 2024, 10:00 PM
      location: "Waterloo",
      attendees: [
        "mailto:alialhamadani72@gmail.com",
        "mailto:Nourannhussainn@gmail.com"
      ]
    };
  
    // Create the ICS file content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${event.startDate}
DTEND:${event.endDate}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;
  
    // Create and trigger the download
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'valentine_date.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const FinalScreen = () => {
    const handleYesClick = () => {
      // Show a sweet message
      alert("Yay! My heart is yours! 💖\n\nI've prepared a special date for us - check your downloads folder for the calendar invite with all the details! 📅");
      // Generate and download the calendar invite
      createCalendarFile();
    };

    return (
      <div className="text-center p-8 animate-fade-in">
        <div className="mb-8">
          <Stars size={80} className="mx-auto mb-4 text-pink-500" />
          <h1 className="text-4xl font-bold mb-6 text-pink-600">
            Will you be my Valentine?
          </h1>
          <p className="text-xl mb-8 text-gray-700">
            Every moment with you makes my heart skip a beat. All these memories we've shared are just the beginning. Would you make me the happiest person and be my Valentine Nouran?
          </p>
          <div className="bg-pink-50 p-6 rounded-xl border-2 border-pink-100 mb-8">
            <p className="text-lg text-gray-700 mb-2">
              Say yes and I'll take you on a special Valentine's date! 
            </p>
            <p className="text-sm text-gray-600">
              (Clicking 'Yes' will download a calendar invite with all the details 📅)
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <button 
            onClick={handleYesClick}
            className="bg-pink-500 hover:bg-pink-600 text-white px-16 py-6 rounded-full text-xl font-bold transition-all duration-300 flex items-center justify-center mx-auto space-x-2"
          >
            <span>Yes Ali! A million times yes!!!!!</span>
          </button>
          <button 
            onClick={() => alert("Erm I think you misclicked. This is the wrong button.")}
            className="bg-white hover:bg-gray-50 text-gray-700 px-16 py-6 rounded-full text-xl font-bold border-2 border-pink-200 transition-all duration-300 flex items-center justify-center mx-auto"
          >
            No, goofy ahh.
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <div 
        ref={mountRef} 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          zIndex: 0,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh'
        }}
      />
      
      <div className="relative z-10 w-full max-w-2xl mx-4">
        <div className="bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl p-12">
          {!showFinal ? (
            <>
              {!showFeedback ? (
                <div className="space-y-8 animate-fade-in">
                  <div className="mb-10">
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mb-3 font-medium">
                      Question {currentStep + 1} of {questions.length}
                    </p>
                    <h2 className="text-3xl font-bold text-gray-800">
                      {questions[currentStep].question}
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {questions[currentStep].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className="w-full text-left flex justify-between items-center px-8 py-6 bg-white hover:bg-pink-50 border-2 border-pink-100 text-gray-700 rounded-xl text-lg font-medium transition-all duration-300"
                      >
                        <span className="flex items-center">
                          <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-pink-200 mr-4">
                            {index + 1}
                          </span>
                          {option}
                        </span>
                        <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-300 text-pink-500" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <FeedbackScreen />
              )}
            </>
          ) : (
            <FinalScreen />
          )}
        </div>
      </div>
    </div>
  );
};

export default ValentineQuiz;