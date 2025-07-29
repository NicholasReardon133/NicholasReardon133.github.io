import React, { useState, useEffect, useRef } from 'react';
import { Home, BookOpen, Code, Mail, Linkedin, Github, User, Briefcase, School } from 'lucide-react';

// --- Helper Data ---
// You can easily update your professional experience here
const experienceData = [
    {
    date: "Summer 2024",
    title: "Software Engineer Intern",
    company: "Peckish AI",
    description: "Wrote APIs and fine-tuned AI models for object detection.",
    icon: <Briefcase size={20} className="text-white" />,
    type: 'work'
    },
    {
    date: "Spring 2024",
    title: "Undergraduate Researcher",
    company: "Purdue University",
    description: "Documented codebase and analyzed data.",
    icon: <Briefcase size={20} className="text-white" />,
    type: 'work'
    },
    {
    date: "Fall 2023",
    title: "Teaching Assistant",
    company: "Purdue University",
    description: "Led coding labs and mentored college freshman.",
    icon: <Briefcase size={20} className="text-white" />,
    type: 'work'
  },
  {
    date: "Summer 2022",
    title: "Software Engineer Intern",
    company: "Netchex",
    description: "Developed an automated internal communication tool.",
    icon: <Briefcase size={20} className="text-white" />,
    type: 'work'
  },
  {
    date: "Summer 2021",
    title: "Quality Assurance Intern",
    company: "Netchex",
    description: "Tested software and wrote bug reports.",
    icon: <Briefcase size={20} className="text-white" />,
    type: 'work'
  },
    {
    date: "2025 - Present",
    title: "Master's in Business and Technology",
    company: "Purdue University",
    description: "",
    icon: <School size={20} className="text-white" />,
    type: 'education'
  },
  {
    date: "2021 - 2025",
    title: "B.S. in Computer Science",
    company: "Purdue University",
    description: "Concentration in Computer Graphics and Visualization, Minor in Economics. <br /> GPA: 3.57",
    icon: <School size={20} className="text-white" />,
    type: 'education'
  }
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

const Sidebar = ({ setPage, page }) => {
    const NavItem = ({ icon, label, pageName }) => (
        <button
            onClick={() => setPage(pageName)}
            className={`flex items-center w-full text-left px-4 py-3 my-1 rounded-lg transition-all duration-200 ${
                page === pageName 
                ? 'bg-sky-500 text-white shadow-lg' 
                : 'text-gray-300 hover:bg-slate-700 hover:text-white'
            }`}
        >
            {icon}
            <span className="ml-4 font-semibold">{label}</span>
        </button>
    );

    return (
        <div className="bg-slate-800 text-white w-64 min-h-screen p-4 flex flex-col fixed top-0 left-0">
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
        </div>
    );
};

const HomePage = () => {
    const [filter, setFilter] = useState('all');

    const filteredExperience = experienceData.filter(item => {
        if (filter === 'all') return true;
        return item.type === filter;
    });

    const FilterButton = ({ type, label }) => (
        <button
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 ${
                filter === type
                ? 'bg-sky-500 text-white shadow'
                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
            }`}
        >
            {label}
        </button>
    );
    return (
        <div className="animate-fade-in">
            {/* Bio Section */}
            <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
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
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4 sm:mb-0">My Journey</h2>
                    <div className="flex space-x-2">
                        <FilterButton type="all" label="All" />
                        <FilterButton type="work" label="Work Experience" />
                        <FilterButton type="education" label="Education" />
                    </div>
                </div>
                
                <div className="relative border-l-2 border-slate-200 ml-4">
                    {filteredExperience.map((item, index) => (
                        // FIX: Removed margin from this parent div and added a new div for text content.
                        <div key={index} className="mb-10 animate-fade-in">
                            {/* Icon remains positioned relative to the timeline bar */}
                            <div className={`absolute -left-5 mt-1.5 w-9 h-9 rounded-full border-4 border-white flex items-center justify-center shadow ${
                                item.type === 'work' ? 'bg-sky-500' : 'bg-emerald-500'
                            }`}>
                                {item.icon}
                            </div>
                            {/* NEW DIV: This div wraps the text and applies the margin, pushing only the text to the right. */}
                            <div className="ml-10">
                                <time className="mb-1 text-sm font-normal leading-none text-slate-500">{item.date}</time>
                                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                                <h4 className="text-md font-medium text-slate-700">{item.company}</h4>
                                <p className="mt-2 text-base font-normal text-slate-600">{item.description}</p>
                            </div>
                        </div>
                    ))}
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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let renderer, scene, camera, controls, animateId;
        
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
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

                scene = new window.THREE.Scene();

                camera = new window.THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
                camera.position.set(0, 1, 15); 

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

                // --- NEW: Texture Loader for Background ---
                const textureLoader = new window.THREE.TextureLoader();
                textureLoader.load('/assets/img/space.jpg', (texture) => {
                    scene.background = texture;
                });

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
                <h1 className="text-4xl font-bold text-slate-800 mb-2">Interactive 3D Gateway Simulation</h1>
                <p className="text-lg text-slate-600">
                    This page is dedicated to an interactive 3D simulation for the Gateway Lunar Space Station built with three.js.
                    Click and drag to rotate the model.
                </p>
            </div>
            <div ref={mountRef} className="relative w-full flex-grow bg-slate-900 rounded-xl shadow-inner" style={{minHeight: '60vh'}}>
                {isLoading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-slate-900 z-10">
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            <p className="mt-4 text-white font-semibold">Loading Model...</p>
                        </div>
                    </div>
                )}
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
            <Sidebar setPage={setPage} page={page} />
            <main className="ml-64 p-8 min-h-screen flex flex-col">
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
