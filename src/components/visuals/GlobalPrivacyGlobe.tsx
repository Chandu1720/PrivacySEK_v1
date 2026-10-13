import React, { useEffect, useRef, useState } from 'react';
import type ThreeGlobeType from 'three-globe';
import { feature } from 'topojson-client';
import type { FeatureCollection, Geometry } from 'geojson';
import type { Topology } from 'topojson-specification';
import {
  AmbientLight,
  Color,
  DirectionalLight,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import worldAtlas from 'world-atlas/countries-110m.json';
import { ExternalLink, Globe2, RotateCcw, X } from 'lucide-react';
import { privacyLaws } from '../../data/privacyLaws';
import './GlobalPrivacyGlobe.css';

const worldTopology = worldAtlas as unknown as Topology;
const countriesObject = (worldTopology.objects as Record<string, Parameters<typeof feature>[1]>)['countries'];
const worldCountries = feature(worldTopology, countriesObject!) as unknown as FeatureCollection<Geometry>;
const highlightedCountryIds = new Set(privacyLaws.flatMap((law) => law.countryIds));

export const GlobalPrivacyGlobe: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef(new Map<string, HTMLButtonElement>());
  const [selectedId, setSelectedId] = useState('eu');
  const [isCardOpen, setIsCardOpen] = useState(true);
  const [webglUnavailable, setWebglUnavailable] = useState(false);
  const selectedLaw = privacyLaws.find((law) => law.id === selectedId) ?? privacyLaws[0]!;

  useEffect(() => {
    let isCanceled = false;
    let cleanupFn: (() => void) | undefined;

    const mount = canvasRef.current;
    const stage = stageRef.current;
    if (!mount || !stage) return;

    (async () => {
      let ThreeGlobeModule: typeof ThreeGlobeType;
      try {
        const mod = await import('three-globe');
        ThreeGlobeModule = mod.default;
      } catch (err) {
        console.error('Failed to load ThreeGlobe:', err);
        setWebglUnavailable(true);
        return;
      }

      if (isCanceled || !canvasRef.current) return;

      let renderer: WebGLRenderer;
      try {
        renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      } catch {
        setWebglUnavailable(true);
        return;
      }

      const scene = new Scene();
      const camera = new PerspectiveCamera(38, 1, 0.1, 1000);
camera.position.set(0, 0, 300);      renderer.outputColorSpace = SRGBColorSpace;
      renderer.setClearColor(0x000000, 0);      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.domElement.setAttribute('aria-hidden', 'true');
      mount.appendChild(renderer.domElement);

      const globe = new ThreeGlobeModule({ waitForGlobeReady: false, animateIn: false })
        .globeMaterial(new MeshPhongMaterial({
          color: new Color('#142344'),
        shininess: 22,
        specular: new Color('#526c9d'),
      }))
      .showGraticules(true)
      .showAtmosphere(true)
      .atmosphereColor('#7a72ed')
      .atmosphereAltitude(0.13)
      .polygonsData(worldCountries.features)
      .polygonCapColor((country) => highlightedCountryIds.has(String((country as { id?: string | number }).id)) ? '#766de0' : '#38547d')
      .polygonSideColor(() => '#243a62')
      .polygonStrokeColor(() => '#8da0c2')
      .polygonAltitude((country) => highlightedCountryIds.has(String((country as { id?: string | number }).id)) ? 0.012 : 0.006)
      .polygonCapCurvatureResolution(4)
      .pointsData(privacyLaws)
      .pointLat('lat')
      .pointLng('lng')
      .pointColor(() => '#f05c72')
      .pointAltitude(0.02)
      .pointRadius(0.28)
      .pointResolution(8)
      .pointsMerge(true)
      .ringsData(privacyLaws)
      .ringLat('lat')
      .ringLng('lng')
      .ringColor(() => '#ef6b80')
      .ringMaxRadius(1.4)
      .ringPropagationSpeed(0.8)
      .ringRepeatPeriod(2600);

    const initialLng = privacyLaws[0]?.lng ?? 0;
    globe.rotation.y = initialLng * Math.PI / 180 - Math.PI / 2;
    globe.scale.setScalar(0.8);
    scene.add(globe);
    scene.add(new AmbientLight('#dce6ff', 1.9));
    const keyLight = new DirectionalLight('#ffffff', 2.2);
    keyLight.position.set(-150, 100, 220);
    scene.add(keyLight);
    const rimLight = new DirectionalLight('#8b7dff', 1.05);
    rimLight.position.set(170, -80, -100);
    scene.add(rimLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    controls.enableDamping = true;
    controls.dampingFactor = 0.045;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = !prefersReducedMotion;
    controls.autoRotateSpeed = 0.22;
    controls.minPolarAngle = 0.25;
    controls.maxPolarAngle = Math.PI - 0.25;

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();


    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    let frameId = 0;
    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      if (document.visibilityState === 'hidden') return;
      controls.update();
      globe.updateMatrixWorld(true);
      camera.updateMatrixWorld();

      const width = mount.clientWidth;
      const height = mount.clientHeight;
      const cameraDirection = camera.position.clone().normalize();
      privacyLaws.forEach((law) => {
        const marker = markerRefs.current.get(law.id);
        if (!marker) return;
        const coordinates = globe.getCoords(law.lat, law.lng, 0.035);
        const worldPosition = globe.localToWorld(new Vector3(coordinates.x, coordinates.y, coordinates.z));
        const isFacingCamera = worldPosition.dot(cameraDirection) > 1;
        const projected = worldPosition.project(camera);
        const isInView = isFacingCamera && projected.z >= -1 && projected.z <= 1;
        marker.style.visibility = isInView ? 'visible' : 'hidden';
        marker.style.left = `${(projected.x + 1) * width / 2}px`;
        marker.style.top = `${(1 - projected.y) * height / 2}px`;
      });
      renderer.render(scene, camera);
    };
    animate();

      cleanupFn = () => {
        window.cancelAnimationFrame(frameId);
        resizeObserver.disconnect();
        controls.dispose();
        (globe as unknown as { _destructor?: () => void })._destructor?.();
        renderer.dispose();
        renderer.domElement.remove();
        scene.traverse((object) => {
          const disposable = object as typeof object & { geometry?: { dispose: () => void }; material?: { dispose: () => void } | Array<{ dispose: () => void }> };
          disposable.geometry?.dispose();
          if (Array.isArray(disposable.material)) disposable.material.forEach((material) => material.dispose());
          else disposable.material?.dispose();
        });
      };
    })();

    return () => {
      isCanceled = true;
      cleanupFn?.();
    };
  }, []);

  return (
    <section className="privacy-globe" aria-label="Global privacy law coverage">
      <div className="privacy-globe__heading">
        <div>
          <span className="privacy-globe__eyebrow"><Globe2 size={14} /> GLOBAL REGULATORY LANDSCAPE</span>
          <h2>Privacy rules, in every direction.</h2>
        </div>
        <span className="privacy-globe__coverage">10 jurisdictions <span aria-hidden="true">/</span> selected laws</span>
      </div>

      <div className="privacy-globe__stage" ref={stageRef}>
        <div className="privacy-globe__canvas" ref={canvasRef}>
          {!webglUnavailable && (
            <div className="privacy-globe__markers" aria-label="Select a jurisdiction">
              {privacyLaws.map((law) => (
                <button
                  key={law.id}
                  ref={(element) => {
                    if (element) markerRefs.current.set(law.id, element);
                    else markerRefs.current.delete(law.id);
                  }}
                  type="button"
                  className={`privacy-globe__marker${law.id === selectedId ? ' is-selected' : ''}`}
                  aria-label={`${law.country}: ${law.law}`}
                  aria-pressed={law.id === selectedId}
                  onMouseEnter={() => {
                    setSelectedId(law.id);
                    setIsCardOpen(true);
                  }}
                  onFocus={() => {
                    setSelectedId(law.id);
                    setIsCardOpen(true);
                  }}
                  onClick={() => {
                    setSelectedId(law.id);
                    setIsCardOpen(true);
                  }}
                >
                  <span className="privacy-globe__marker-dot" aria-hidden="true" />
                  <span className="privacy-globe__marker-label">{law.shortName}</span>
                </button>
              ))}
            </div>
          )}
          {webglUnavailable && (
            <div className="privacy-globe__fallback" role="status">
              <Globe2 size={38} strokeWidth={1.3} />
              <span>Global privacy law coverage</span>
              <small>Select a jurisdiction to view its law.</small>
            </div>
          )}
          <div className="privacy-globe__drag-hint"><RotateCcw size={12} /> Drag to explore</div>
        </div>

        {isCardOpen ? (
          <aside className="privacy-globe__law-card" aria-live="polite" aria-atomic="true">
            <div className="privacy-globe__card-topline">
              <span className="privacy-globe__card-region">{selectedLaw.country}</span>
              <div className="privacy-globe__card-actions">
                <span className="privacy-globe__card-index">{String(privacyLaws.findIndex((law) => law.id === selectedId) + 1).padStart(2, '0')} / 10</span>
                <button
                  type="button"
                  onClick={() => setIsCardOpen(false)}
                  className="privacy-globe__card-close"
                  aria-label="Dismiss details pop-up"
                  title="Close pop-up"
                >
                  <X size={13} />
                </button>
              </div>
            </div>
            <h3>{selectedLaw.law}</h3>
            <p>{selectedLaw.description}</p>
            <a href={selectedLaw.source} target="_blank" rel="noreferrer">
              {selectedLaw.sourceLabel}<ExternalLink size={13} aria-hidden="true" />
            </a>
            <div className="privacy-globe__card-foot"><span /> Enacted legislation and official regulator sources</div>
          </aside>
        ) : (
          <button
            type="button"
            onClick={() => setIsCardOpen(true)}
            className="privacy-globe__card-reopen"
            aria-label={`Open details for ${selectedLaw.country}`}
          >
            <Globe2 size={13} />
            <span>{selectedLaw.country} details</span>
          </button>
        )}
      </div>

      <div className="privacy-globe__legend" aria-hidden="true">
        <span><i className="privacy-globe__legend-law" /> Privacy legislation</span>
        <span><i className="privacy-globe__legend-boundary" /> National boundaries</span>
        <span>Illustrative coverage, not legal advice</span>
      </div>

      {webglUnavailable && (
        <div className="privacy-globe__fallback-list" aria-label="Privacy laws by jurisdiction">
          {privacyLaws.map((law) => (
            <button key={law.id} type="button" onClick={() => setSelectedId(law.id)} aria-pressed={law.id === selectedId}>
              {law.shortName}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};
