import React, { useState, useEffect, useRef } from 'react';
import { Home, BookOpen, Code, Mail, Linkedin, Github, User, Briefcase, School } from 'lucide-react';

// --- Helper Data ---
const experienceData = [
    {
        date: "2025 - Present",
        title: "Master's in Business and Technology",
        company: "Purdue University",
        description: "",
        icon: <School size={28} className="text-white" />,
        type: 'education',
        imageSrc: '/assets/img/mbt.jpg'
    },
    {
        date: "Summer 2024",
        title: "Software Engineer Intern",
        company: "Peckish AI",
        description: "Wrote APIs and fine-tuned AI models for object detection.",
        icon: <Briefcase size={28} className="text-white" />,
        type: 'work',
        imageSrc: '/assets/img/peckish.jpg'
    },
    {
        date: "Spring 2024",
        title: "Undergraduate Researcher",
        company: "Purdue University",
        description: "Documented codebase and analyzed data.",
        icon: <Briefcase size={28} className="text-white" />,
        type: 'work',
        imageSrc: '/assets/img/research.png'
    },
    {
        date: "Fall 2023",
        title: "Teaching Assistant",
        company: "Purdue University",
        description: "Led coding labs and mentored college freshman.",
        icon: <Briefcase size={28} className="text-white" />,
        type: 'work',
        imageSrc: '/assets/img/ta.png'
    },
    {
        date: "Summer 2022",
        title: "Software Engineer Intern",
        company: "Netchex",
        description: "Developed an automated internal communication tool.",
        icon: <Briefcase size={28} className="text-white" />,
        type: 'work',
        imageSrc: '/assets/img/netchexSwe.png'
    },
    {
        date: "2021 - 2025",
        title: "B.S. in Computer Science",
        company: "Purdue University",
        description: "Concentration in Computer Graphics and Visualization, Minor in Economics. <br /><br /> GPA: 3.57",
        icon: <School size={28} className="text-white" />,
        type: 'education',
        imageSrc: '/assets/img/compsci.png'
    },
    {
        date: "Summer 2021",
        title: "Quality Assurance Intern",
        company: "Netchex",
        description: "Tested software and wrote bug reports.",
        icon: <Briefcase size={28} className="text-white" />,
        type: 'work',
        imageSrc: '/assets/img/qa.png'
    },
];

// You can update your project data here
const schoolProjects = [
    {
        title: "Unity Occlusion Culling",
        description: "In this project, I created an occlusion culling script that utilized raycasting to selectively render visible objects. I created all of the building models in Blender, as well as the testing environment in Unity. The first step is to set up Frustrum Culling, which involves testing if the buildings' bounding boxes are within the field of view of the camera. After that, I cast rays from the camera to all of the remaining bounding boxes, and any object that the rays do not reach are not rendered.",
        mediaType: 'video',
        mediaSrc: 'https://www.youtube.com/embed/8F179_CA1AI',
        images: [
            "/assets/img/build2.PNG",
            "/assets/img/build3.PNG",
            "/assets/img/build1.PNG"
        ]
    },
    {
        title: "Procedural Modeling & L-Systems",
        description: "In this project, I implemented a mini-procedural tree modeler using L-Systems. It reads in a simple text file containing the rotation angle, iterations, axiom, and rules. Once the string is created, it is translated into 2D line segments following 'turtle drawing' logic to produce the geometry.",
        mediaType: 'image',
        mediaSrc: '/assets/img/proced.gif',
        images: []
    },
    {
        title: "Texture, Bump, and Shadow Mapping",
        description: "For this project, I first had to construct the TBN coordinate system and convert the computation of lighting from world space to tangent space. Next, I rendered the scene from the light's persepctive to get the depth map as a texture, and then added shading and shadows in their respective places. In addition, I added diffusion into the shadows to create 'soft shadows.'",
        mediaType: 'image',
        mediaSrc: '/assets/img/shadow.gif',
        images: []
    },
    {
        title: "Ray Tracing & Phong Shading",
        description: "Starting with a sphere, ground plane, sky, and light source, I implemented ray-sphere intersection and computed surface normals for the sphere and plane. Next, I created a shading function based on the Phong model, as well as specular reflection to result in its glossy finish.",
        mediaType: 'image',
        mediaSrc: '/assets/img/phong.gif',
        images: []
    }
];


// --- Components ---

// CHANGE: Renamed Sidebar to Navigation for clarity
const Navigation = ({ setPage, page, isMobile }) => {
    const NavItem = ({ icon, label, pageName }) => (
        <button
            onClick={() => setPage(pageName)}
            // CHANGE: Styling adjusted for both mobile and desktop
            className={`flex items-center justify-center lg:justify-start w-full text-left px-4 py-3 my-1 rounded-lg transition-all duration-200 ${
                page === pageName 
                ? 'bg-sky-500 text-white shadow-lg' 
                : 'text-gray-300 hover:bg-slate-700 hover:text-white'
            }`}
        >
            {icon}
            {/* CHANGE: Text label is hidden on mobile screens */}
            <span className="ml-4 font-semibold hidden lg:block">{label}</span>
        </button>
    );

    // Mobile View: Top Bar
    if (isMobile) {
        return (
            <header className="bg-slate-800 text-white w-full p-2 flex justify-center fixed top-0 left-0 z-30 shadow-lg">
                <nav className="flex space-x-2">
                    <NavItem icon={<Home size={24} />} label="Home" pageName="home" />
                    <NavItem icon={<BookOpen size={24} />} label="School Projects" pageName="education" />
                    <NavItem icon={<Code size={24} />} label="Simulation" pageName="simulation" />
                </nav>
            </header>
        );
    }

    // Desktop View: Side Bar
    return (
        <aside className="bg-slate-800 text-white w-64 min-h-screen p-4 flex-col fixed top-0 left-0 hidden lg:flex">
            <div className="mb-10 text-center">
                <h1 className="text-2xl font-bold text-white">Nicholas Reardon</h1>
                <p className="text-sm text-slate-400">Computer Graphics Portfolio</p>
            </div>
            <nav>
                <NavItem icon={<Home size={20} />} label="Home" pageName="home" />
                <NavItem icon={<BookOpen size={20} />} label="School Projects" pageName="education" />
                <NavItem icon={<Code size={20} />} label="Simulation" pageName="simulation" />
            </nav>
            <div className="mt-auto text-center text-slate-500 text-xs">
                <p>&copy; 2024 Nicholas Reardon</p>
            </div>
        </aside>
    );
};

const HomePage = () => {
    return (
        <div className="animate-fade-in">
            {/* Bio Section */}
            <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
                <div className="flex flex-col md:flex-row items-center">
                    <img 
                        src="/assets/img/prof.jpg" 
                        alt="Nicholas Reardon" 
                        className="w-52 h-52 rounded-full mr-0 md:mr-8 mb-6 md:mb-0 border-4 border-slate-200 shadow-md"
                    />
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold text-slate-800">Welcome to My Portfolio</h1>
                        <p className="mt-4 text-lg text-slate-600">
                            Hi! My name is Nicholas Reardon. I've just finished up my undergraduate in Computer Science, and I'm on my way to begin my next chapter in the Masters of Business and Technology cohort this fall! Outside of tech, I've worked as a personal fitness trainer, play golf on the weekends, and grind video games. Please feel free to explore my work and reach out if you are interested to connect!
                        </p>
                    </div>
                </div>
            </div>

            {/* Timeline Section */}
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-bold text-slate-800 mt-36 mb-36 text-center">My Journey</h2>
                <div className="relative wrap overflow-hidden p-10 h-full mb-24">
                    <div className="absolute h-full border border-slate-700 border-2-2 bg-slate-700" style={{left: '50%'}}></div>

                    {experienceData.map((item, index) => {
                        const isWork = item.type === 'work';
                        const isLeft = isWork; 

                        const timelineRow = (
                            // COMMENT: To adjust the spacing between timeline items, change the 'mb-24' (margin-bottom) class below.
                            // Larger numbers (e.g., mb-32) increase the space, smaller numbers (e.g., mb-16) decrease it.
                            <div key={index} className={`mb-32 flex justify-between items-center w-full ${isLeft ? 'flex-row-reverse' : ''}`}>
                                <div className="order-1 w-5/12 flex justify-center animate-fade-in-up" style={{ animationDelay: `${index * 0.15}s`}}>
                                    <img src={item.imageSrc} alt={item.title} className="rounded-lg shadow-xl w-64 h-64 object-cover" />
                                </div>
                                
                                <div className={`z-20 flex items-center order-1 ${isWork ? 'bg-sky-500' : 'bg-emerald-500'} shadow-xl w-16 h-16 rounded-full`}>
                                    <div className="mx-auto text-white">
                                        {item.icon}
                                    </div>
                                </div>
                                
                                <div
                                    className="order-1 bg-white rounded-lg shadow-xl w-5/12 px-6 py-4 animate-fade-in-up"
                                    style={{ animationDelay: `${index}s`}}
                                >
                                    <time className={`mb-1 text-md font-semibold leading-none ${isWork ? 'text-sky-600' : 'text-emerald-600'}`}>{item.date}</time>
                                    <h3 className="mb-2 font-bold text-slate-800 text-2xl">{item.title}</h3>
                                    <h4 className="text-lg font-medium text-slate-700 mb-3">{item.company}</h4>
                                    <p className="text-md leading-snug tracking-wide text-slate-600" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                </div>
                            </div>
                        );
                        return timelineRow;
                    })}
                </div>
            </div>
        </div>
    );
};

const EducationPage = () => {
    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-bold text-slate-800 mb-2 text-center">University Projects</h1>
            <p className="text-lg text-slate-600 mb-8 text-center">
                Each of the following are computer graphics assignments I have worked on.
            </p>
            
            <div className="space-y-12">
                {schoolProjects.map((project, index) => (
                    <div key={index} className="bg-white p-8 rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row items-center gap-8">
                        {/* Media Content */}
                        <div className="w-full lg:w-1/2">
                            {project.mediaType === 'video' ? (
                                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                    <iframe src={project.mediaSrc} title={project.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
                                </div>
                            ) : (
                                <img src={project.mediaSrc} alt={project.title} className="w-full h-auto object-cover rounded-lg shadow-md" />
                            )}
                            {project.images && project.images.length > 0 && (
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    {project.images.map((img, i) => (
                                        <img key={i} src={img} alt={`${project.title} screenshot ${i+1}`} className="object-contain rounded-md shadow-sm" />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Text Content */}
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-2xl font-bold text-slate-800 mb-3">{project.title}</h2>
                            <p className="text-slate-600">{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const SimulationPage = () => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 0 });
    const [showDragHint, setShowDragHint] = useState(false);
    // CHANGE: Default background is now 'space.jpg'
    const [background, setBackground] = useState('/assets/img/space.jpg');

    const handleBackgroundChange = (e) => {
        setBackground(e.target.value);
    };

    useEffect(() => {
        if (sceneRef.current && window.THREE) {
            const scene = sceneRef.current;
            const value = background;

            if (value.startsWith('/assets')) {
                const textureLoader = new window.THREE.TextureLoader();
                textureLoader.load(value, (texture) => {
                    scene.background = texture;
                });
            } else {
                scene.background = new window.THREE.Color(value);
            }
        }
    }, [background]);


    useEffect(() => {
        let renderer, camera, controls, animateId;
        
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                if (document.getElementById(src)) {
                    resolve();
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                script.id = src;
                document.body.appendChild(script);
            });
        };

        const initThreeJsScene = async () => {
            try {
                await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js");
                await Promise.all([
                    loadScript("https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"),
                    loadScript("https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js")
                ]);

                sceneRef.current = new window.THREE.Scene();
                const scene = sceneRef.current;
                
                const textureLoader = new window.THREE.TextureLoader();
                textureLoader.load(background, (texture) => {
                    scene.background = texture;
                });

                camera = new window.THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
                // CHANGE: Updated camera position
                camera.position.set(-9, -3, 20); 
                setCameraPosition({ x: -9, y: -3, z: 20 });

                renderer = new window.THREE.WebGLRenderer({ antialias: true });
                renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
                mountRef.current.appendChild(renderer.domElement);

                const ambientLight = new window.THREE.AmbientLight(0xffffff, 0.8);
                scene.add(ambientLight);
                const directionalLight = new window.THREE.DirectionalLight(0xffffff, 1);
                directionalLight.position.set(5, 10, 7.5);
                scene.add(directionalLight);

                controls = new window.THREE.OrbitControls(camera, renderer.domElement);
                controls.enableDamping = true;
                controls.dampingFactor = 0.05;
                controls.screenSpacePanning = false;
                controls.minDistance = 2;
                controls.maxDistance = 50;

                const hideHintOnFirstInteraction = () => {
                    setShowDragHint(false);
                    controls.removeEventListener('start', hideHintOnFirstInteraction);
                };
                controls.addEventListener('start', hideHintOnFirstInteraction);

                const loader = new window.THREE.GLTFLoader();
                loader.load(
                    '/assets/models/gateway.glb',
                    (gltf) => {
                        const model = gltf.scene;
                        const box = new window.THREE.Box3().setFromObject(model);
                        const center = box.getCenter(new window.THREE.Vector3());
                        model.position.sub(center);
                        scene.add(model);
                        setIsLoading(false);
                        setShowDragHint(true);
                    },
                    undefined,
                    (error) => {
                        console.error('An error happened while loading the model:', error);
                        setIsLoading(false);
                    }
                );

                const animate = function () {
                    animateId = requestAnimationFrame(animate);
                    controls.update();
                    
                    setCameraPosition(prevPos => {
                        const newX = parseFloat(camera.position.x.toFixed(2));
                        const newY = parseFloat(camera.position.y.toFixed(2));
                        const newZ = parseFloat(camera.position.z.toFixed(2));
                        if (newX !== prevPos.x || newY !== prevPos.y || newZ !== prevPos.z) {
                            return { x: newX, y: newY, z: newZ };
                        }
                        return prevPos;
                    });

                    renderer.render(scene, camera);
                };
                animate();

            } catch (error) {
                console.error("Failed to load three.js scripts:", error);
                setIsLoading(false);
            }
        };

        initThreeJsScene();

        const handleResize = () => {
            if (mountRef.current && renderer) {
                const width = mountRef.current.clientWidth;
                const height = mountRef.current.clientHeight;
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
            }
        };
        
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animateId);
            window.removeEventListener('resize', handleResize);
            if (controls) controls.dispose();
            if (mountRef.current && renderer && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            document.getElementById("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js")?.remove();
            document.getElementById("https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js")?.remove();
            document.getElementById("https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js")?.remove();
        };

    }, []);

    return (
        <div className="animate-fade-in h-full flex flex-col">
            <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                     <div>
                        <h1 className="text-4xl font-bold text-slate-800 mb-2">Interactive 3D Simulation</h1>
                        <p className="text-lg text-slate-600">
                            Click and drag to rotate the model, or use the dropdown to change the scene.
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        {/* CHANGE: Increased font size and boldness of the label */}
                        <label htmlFor="bg-select" className="block text-lg font-bold text-slate-800 mb-1">Background</label>
                        {/* CHANGE: Increased text size and padding of the dropdown */}
                        <select
                            id="bg-select"
                            value={background}
                            onChange={handleBackgroundChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-lg border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 rounded-md shadow-sm"
                        >
                            <option value="/assets/img/moon.jpg">Moon</option>
                            <option value="/assets/img/space.jpg">Space</option>
                            <option value="/assets/img/blue.jpg">Blue</option>
                            <option value="#ffffff">White</option>
                            <option value="#000000">Black</option>
                        </select>
                    </div>
                </div>
            </div>
            <div ref={mountRef} className="relative w-full flex-grow bg-slate-900 rounded-xl shadow-inner" style={{minHeight: '60vh'}}>
                {isLoading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-slate-900 z-20">
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            <p className="mt-4 text-white font-semibold">Loading Model...</p>
                        </div>
                    </div>
                )}
                {showDragHint && (
                    <div className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none transition-opacity duration-500">
                        <div className="bg-black bg-opacity-60 text-white font-semibold px-4 py-2 rounded-lg animate-pulse">
                            Click and drag to explore
                        </div>
                    </div>
                )}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-gray-300 text-xs font-mono p-2 rounded-md pointer-events-none">
                    <p>Camera Position:</p>
                    <p>X: {cameraPosition.x}</p>
                    <p>Y: {cameraPosition.y}</p>
                    <p>Z: {cameraPosition.z}</p>
                </div>
            </div>
        </div>
    );
};


const Footer = () => {
    return (
        <footer className="bg-white p-6 rounded-xl shadow-lg mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800 mb-4 md:mb-0">Get in Touch</h3>
                <div className="flex space-x-6">
                    <a href="mailto:nicholas@reardonusa.com" className="text-slate-600 hover:text-sky-500 transition-colors">
                        <Mail size={28} />
                    </a>
                    <a href="https://www.linkedin.com/in/nicholas-reardon-ab9bba241/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-sky-500 transition-colors">
                        <Linkedin size={28} />
                    </a>
                    <a href="https://github.com/NicholasReardon133" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-sky-500 transition-colors">
                        <Github size={28} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default function App() {
    const [page, setPage] = useState('home');
    // NEW: State to track if the view is mobile
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    // NEW: Effect to listen for window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomePage />;
            case 'education':
                return <EducationPage />;
            case 'simulation':
                return <SimulationPage />;
            default:
                return <HomePage />;
        }
    };

    return (
        <div className="bg-slate-100 font-sans">
            {/* CHANGE: Pass isMobile prop to Navigation */}
            <Navigation setPage={setPage} page={page} isMobile={isMobile}/>
            {/* CHANGE: Main content padding adjusts based on isMobile */}
            <main className={`p-8 min-h-screen flex flex-col transition-all duration-300 ${isMobile ? 'pt-24' : 'lg:ml-64'}`}>
                <div className="flex-grow">
                    {renderPage()}
                </div>
                <Footer />
            </main>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
                .aspect-w-16 { position: relative; padding-bottom: 56.25%; }
                .aspect-h-9 { height: 0; }
                .aspect-w-16 > iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </div>
    );
}