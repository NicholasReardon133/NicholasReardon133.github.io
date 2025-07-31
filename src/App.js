import React, { useState, useEffect, useRef } from 'react';
import { Home, Code, Mail, Linkedin, Github, Briefcase, School, FolderKanban, ArrowLeft } from 'lucide-react';

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

const mainProjectsData = [
    {
        id: 'gateway-simulation',
        title: 'Gateway Station Simulation',
        imageSrc: '/assets/img/gateway.jpg',
    },
    {
        id: 'occlusion-culling',
        title: 'Real-Time Occlusion Culling in Unity',
        imageSrc: '/assets/img/occlusion.png',
    },
    {
        id: 'graphics-engine',
        title: 'From Scratch 3D Graphics Engine using C++',
        imageSrc: '/assets/img/engine1.png',
    },
    {
        id: 'graphics-deep-dive',
        title: 'Computer Graphics Deep Dive',
        imageSrc: '/assets/img/deepdive.jpg',
    }
];

const occlusionCullingDetails = {
    title: "Real-Time Occlusion Culling in Unity",
    youtubeSrc: "https://www.youtube.com/embed/8F179_CA1AI",
    githubUrl: "https://github.com/NicholasReardon133/OcclusionCullingUnity",
    sections: [
        {
            text: "In this project, I created an occlusion culling script that utilized raycasting to selectively render visible objects. I created all of the building models in Blender, as well as the testing environment in Unity. The first step is to set up Frustum Culling, which involves testing if the buildings' bounding boxes are within the field of view of the camera.",
            image: '/assets/img/build1.PNG'
        },
        {
            text: "After the initial pass of Frustum Culling, the next step is to cast rays from the camera to the corners of the bounding boxes for all remaining objects. Any object that is not struck by a ray is considered 'occluded' by another object and is therefore not rendered by the camera. This two-pass system significantly improves performance in dense environments.",
            image: '/assets/img/build2.PNG'
        },
        {
            text: "The final result is a system where only the necessary geometry is rendered to the screen, freeing up GPU resources and increasing the frame rate. This technique is crucial for developing complex and performant 3D scenes in games and simulations. The complete project, including the C# scripts and Unity setup, is available to view on GitHub.",
            image: '/assets/img/wire.PNG'
        },
    ]
};

const deepDiveDetails = {
    title: "Computer Graphics Deep Dive",
    githubUrl: "https://github.com/NicholasReardon133/CS334",
    topics: [
        {
            title: "Procedural Modeling & L-Systems",
            mediaSrc: '/assets/img/proced.gif',
            description: "Implemented a procedural tree modeler using L-Systems, a type of formal grammar. The system reads a text file defining an axiom (the starting string), production rules (how to expand the string), an angle, and iteration count. The resulting string is then interpreted using 'turtle graphics' logic, where characters correspond to actions like 'draw forward', 'turn left', or 'push/pop state', to generate complex, fractal-like 2D geometry from a simple set of rules."
        },
        {
            title: "Texture, Bump, and Shadow Mapping",
            mediaSrc: '/assets/img/shadow.gif',
            description: "This project focused on advanced shading techniques. First, I constructed the Tangent-Bitangent-Normal (TBN) coordinate system for each vertex to correctly apply normal maps, which simulate fine surface detail without adding geometry. For shadows, I implemented shadow mapping by rendering the scene from the light's perspective into a depth buffer. In the main render pass, fragment positions are transformed into the light's space to compare their depth against the shadow map, determining if they are in shadow. Soft shadows were achieved using Percentage-Closer Filtering (PCF)."
        },
        {
            title: "Ray Tracing & Phong Shading",
            mediaSrc: '/assets/img/phong.gif',
            description: "Built a basic ray tracer that generates an image by casting primary rays from the camera through each pixel. The core of the engine is the ray-object intersection logic, using analytic methods for spheres and geometric tests for planes. Upon intersection, surface normals are calculated and used in the Phong illumination model, which combines ambient, diffuse, and specular lighting components to determine the final color. Specular reflections were implemented by recursively casting new rays from the intersection point."
        }
    ]
};

const graphicsEngineDetails = {
    title: "From Scratch 3D Graphics Engine using C++",
    githubUrl: "https://github.com/NicholasReardon133/RendererProject/tree/master",
    sections: [
        {
            image: '/assets/img/engine2.png',
            text: "This project was a comprehensive journey into the fundamentals of 3D graphics, built from the ground up in C++ using the DirectX 11 API. Following the excellent tutorial series by ChiliTomatoNoodle, I implemented a complete rendering pipeline, starting with the raw Win32 API for window creation and message handling. This foundational step provided a deep understanding of how a graphics application interfaces with the operating system before any rendering even begins. After that, it took implementing debug diagnostics, keyboard and mouse capture, Component Object Model (COM) programming, and shader construction to get our first triangle."
        },
        {
            image: '/assets/img/engine3.png',
            text: "At its core, the engine is a custom implementation of the DirectX 11 graphics pipeline. I implemented vertex shaders for transforming model vertices from local space to screen space and pixel shaders for applying lighting and textures. The engine supports loading and rendering 3D models, with a controllable 3D camera and a basic implementation of the Phong lighting model for realistic shading. This project was an invaluable exercise in understanding the low-level mechanics of 3D rendering that are often abstracted away by modern game engines."
        }
    ]
};

// --- Custom Hooks ---
const useIntersectionObserver = (options) => {
    const [ref, setRef] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, options);

        if (ref) {
            observer.observe(ref);
        }

        return () => {
            if (ref) {
                observer.unobserve(ref);
            }
        };
    }, [ref, options]);

    return [setRef, isVisible];
};


// --- Components ---

const Navigation = ({ setPage, page, isMobile }) => {
    const NavItem = ({ icon, label, pageName }) => (
        <button
            onClick={() => setPage(pageName)}
            className={`flex items-center justify-center lg:justify-start w-full text-left px-4 py-3 my-1 rounded-lg transition-all duration-200 ${
                page === pageName 
                ? 'bg-sky-500 text-white shadow-lg' 
                : 'text-gray-300 hover:bg-slate-700 hover:text-white'
            }`}
        >
            {icon}
            <span className="ml-4 font-semibold hidden lg:block">{label}</span>
        </button>
    );

    if (isMobile) {
        return (
            <header className="bg-slate-800 text-white w-full p-2 flex justify-center fixed top-0 left-0 z-30 shadow-lg">
                <nav className="flex space-x-2">
                    <NavItem icon={<Home size={24} />} label="Home" pageName="home" />
                    <NavItem icon={<FolderKanban size={24} />} label="Projects" pageName="projects" />
                </nav>
            </header>
        );
    }

    return (
        <aside className="bg-slate-800 text-white w-64 min-h-screen p-4 flex-col fixed top-0 left-0 hidden lg:flex">
            <div className="mb-10 text-center">
                <h1 className="text-2xl font-bold text-white">Nicholas Reardon</h1>
                <p className="text-sm text-slate-400">Computer Graphics Portfolio</p>
            </div>
            <nav>
                <NavItem icon={<Home size={20} />} label="Home" pageName="home" />
                <NavItem icon={<FolderKanban size={20} />} label="Projects" pageName="projects" />
            </nav>
            <div className="mt-auto text-center text-slate-500 text-xs">
                <p>&copy; 2024 Nicholas Reardon</p>
            </div>
        </aside>
    );
};

//Timeline Item component with scroll animation logic
const TimelineItem = ({ item, isMobile }) => {
    const [setRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });
    
    if (isMobile) {
        return (
            <div
                ref={setRef}
                className={`bg-white p-6 rounded-lg shadow-lg transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            >
                <time className={`block mb-2 text-sm font-semibold leading-none ${item.type === 'work' ? 'text-sky-600' : 'text-emerald-600'}`}>{item.date}</time>
                <h3 className="mb-1 font-bold text-slate-800 text-xl">{item.title}</h3>
                <h4 className="text-md font-medium text-slate-700 mb-3">{item.company}</h4>
                {item.description && <p className="text-sm leading-snug tracking-wide text-slate-600" dangerouslySetInnerHTML={{ __html: item.description }}></p>}
            </div>
        );
    }

    const isWork = item.type === 'work';
    const isLeft = isWork;

    return (
        <div ref={setRef} className={`mb-32 flex justify-between items-center w-full ${isLeft ? 'flex-row-reverse' : ''}`}>
            <div className={`order-1 w-5/12 flex justify-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isLeft ? 'translate-x-10' : '-translate-x-10'}`}`}>
                <img src={item.imageSrc} alt={item.title} className="rounded-lg shadow-xl w-64 h-64 object-cover" />
            </div>
            
            <div className={`z-20 flex items-center order-1 ${isWork ? 'bg-sky-500' : 'bg-emerald-500'} shadow-xl w-16 h-16 rounded-full transition-transform duration-500 ${isVisible ? 'scale-100' : 'scale-0'}`}>
                <div className="mx-auto text-white">
                    {item.icon}
                </div>
            </div>
            
            <div className={`order-1 bg-white rounded-lg shadow-xl w-5/12 px-6 py-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isLeft ? '-translate-x-10' : 'translate-x-10'}`}`}>
                <time className={`mb-1 text-md font-semibold leading-none ${isWork ? 'text-sky-600' : 'text-emerald-600'}`}>{item.date}</time>
                <h3 className="mb-2 font-bold text-slate-800 text-2xl">{item.title}</h3>
                <h4 className="text-lg font-medium text-slate-700 mb-3">{item.company}</h4>
                <p className="text-md leading-snug tracking-wide text-slate-600" dangerouslySetInnerHTML={{ __html: item.description }}></p>
            </div>
        </div>
    );
};


const HomePage = ({ isMobile }) => {
    return (
        <div className="animate-fade-in">
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

            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-bold text-slate-800 mt-12 md:mt-36 mb-12 md:mb-24 text-center">My Journey</h2>
                
                {isMobile ? (
                    <div className="space-y-8">
                        {experienceData.map((item, index) => (
                            <TimelineItem key={index} item={item} isMobile={true} />
                        ))}
                    </div>
                ) : (
                    <div className="relative wrap overflow-hidden p-10 h-full">
                        <div className="absolute h-full border border-slate-700 border-2-2 bg-slate-700" style={{left: '50%'}}></div>
                        {experienceData.map((item, index) => (
                           <TimelineItem key={index} item={item} isMobile={false} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    if (selectedProject) {
        return <ProjectDetailPage projectId={selectedProject} onBack={() => setSelectedProject(null)} />;
    }

    return (
        <div className="animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-slate-800 mt-8 mb-12">My Projects</h1>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Here is a collection of my favorite projects, ranging from interactive real-time simulations to the foundational principles of 3D graphics. Each card represents a unique challenge and a story of creative problem-solving.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {mainProjectsData.map((project, index) => (
                    <div 
                        key={project.id} 
                        className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 group animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s`}}
                        onClick={() => setSelectedProject(project.id)}
                    >
                        <img src={project.imageSrc} alt={project.title} className="w-full h-64 object-cover" />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors duration-300">{project.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProjectDetailPage = ({ projectId, onBack }) => {
    const project = mainProjectsData.find(p => p.id === projectId);

    const renderProjectContent = () => {
        switch (projectId) {
            case 'gateway-simulation':
                return <SimulationPage isEmbedded={true} />;
            case 'occlusion-culling':
                return <OcclusionCullingProjectPage />;
            case 'graphics-deep-dive':
                return <ComputerGraphicsDeepDivePage />;
            case 'graphics-engine':
                return <GraphicsEngineProjectPage />;
            default:
                return (
                     <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h1 className="text-4xl font-bold text-slate-800">{project.title}</h1>
                        <p className="mt-4 text-lg text-slate-600">
                            Content for this project will be added soon.
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="animate-fade-in">
            <button onClick={onBack} className="flex items-center text-slate-600 hover:text-sky-600 font-semibold mb-8 transition-colors">
                <ArrowLeft size={20} className="mr-2" />
                Back to All Projects
            </button>
            {renderProjectContent()}
        </div>
    );
};

const OcclusionCullingProjectPage = () => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold text-slate-800 text-center mb-8">{occlusionCullingDetails.title}</h1>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-12 shadow-lg">
                <iframe src={occlusionCullingDetails.youtubeSrc} title={occlusionCullingDetails.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
            </div>
            
            <div className="space-y-16">
                {occlusionCullingDetails.sections.map((section, index) => (
                    <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                        <div className="w-full md:w-1/2">
                            <p className="text-lg text-slate-600">{section.text}</p>
                            {index === occlusionCullingDetails.sections.length - 1 && (
                                 <a href={occlusionCullingDetails.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-6 px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 transition-colors">
                                    <Github size={20} className="mr-2" />
                                    View on GitHub
                                </a>
                            )}
                        </div>
                        <div className="w-full md:w-1/2">
                            <img src={section.image} alt={`Occlusion Culling Detail ${index}`} className="rounded-lg shadow-md w-full object-cover" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ComputerGraphicsDeepDivePage = () => {
    return (
        <div className="animate-fade-in">
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-4xl font-bold text-slate-800 mb-2 text-center">{deepDiveDetails.title}</h1>
                <p className="text-lg text-slate-600 mb-12 text-center max-w-2xl mx-auto">
                    A collection of foundational graphics techniques implemented from scratch in C++.
                </p>
                
                <div className="space-y-16">
                    {deepDiveDetails.topics.map((topic, index) => (
                        <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}>
                            <div className="w-full lg:w-1/2">
                                <img src={topic.mediaSrc} alt={topic.title} className="w-full h-auto object-cover rounded-lg shadow-md" />
                            </div>
                            <div className="w-full lg:w-1/2">
                                <h2 className="text-2xl font-bold text-slate-800 mb-3">{topic.title}</h2>
                                <p className="text-slate-600">{topic.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a href={deepDiveDetails.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 bg-slate-800 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 transition-colors">
                        <Github size={24} className="mr-3" />
                        View All on GitHub
                    </a>
                </div>
            </div>
        </div>
    );
};

const GraphicsEngineProjectPage = () => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold text-slate-800 text-center mb-12">{graphicsEngineDetails.title}</h1>
            <div className="space-y-16">
                {graphicsEngineDetails.sections.map((section, index) => (
                     <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                        <div className="w-full md:w-1/2">
                            <img src={section.image} alt={`Graphics Engine Detail ${index}`} className="rounded-lg shadow-md w-full h-full object-contain" />
                        </div>
                        <div className="w-full md:w-1/2">
                            <p className="text-lg text-slate-600">{section.text}</p>
                        </div>
                    </div>
                ))}
            </div>
             <div className="mt-12 text-center">
                <a href={graphicsEngineDetails.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 bg-slate-800 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 transition-colors">
                    <Github size={24} className="mr-3" />
                    View on GitHub
                </a>
            </div>
        </div>
    );
};


const SimulationPage = ({ isEmbedded = false }) => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 0 });
    const [showDragHint, setShowDragHint] = useState(false);
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
                        <label htmlFor="bg-select" className="block text-lg font-bold text-slate-800 mb-1">Background</label>
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
             {isEmbedded && (
                <div className="mt-8 text-center">
                    <a href="https://github.com/NicholasReardon133/GatewaySimulation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 bg-slate-800 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 transition-colors">
                        <Github size={24} className="mr-3" />
                        View on GitHub
                    </a>
                </div>
            )}
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
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

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
                return <HomePage isMobile={isMobile} />;
            case 'projects':
                return <ProjectsPage />;
            default:
                return <HomePage isMobile={isMobile} />;
        }
    };

    return (
        <div className="bg-slate-100 font-sans">
            <Navigation setPage={setPage} page={page} isMobile={isMobile}/>
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
                @keyframes fade-in-up {
                    from { 
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    opacity: 0;
                    animation: fade-in-up 0.5s ease-out forwards;
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
