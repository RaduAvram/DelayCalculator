/* ═══════════════════════════════════════════════════════════════
   STATE & CONSTANTS
   ═══════════════════════════════════════════════════════════════ */
const state = {
  lang: 'en',
  hpfType: 'BW',
  hpfOrder: 2,
  xoType: 'LR',
  xoOrder: 4,
  allowPolarityInvert: false,
  enableBackline: true,
  calcMode: 'phase', // 'phase' (Mode A: Smaart-Grade Phase Angle, Default) | 'gd' (Mode B: Group Delay Slope)
  matrixNixie: false // false (Clean LCD numbers) | true (Vintage Glowing Nixie Tubes)
};

const i18n = {
  en: {
    lang_btn: 'EN',
    lang_btn_title: 'Comută limba în Română',
    btn_text_size_title: 'Adjust Interface Text Size',
    btn_theme_title: 'Toggle Light/Dark Theme',
    btn_theme_light: '☀️ Light',
    btn_theme_dark: '🌙 Dark',
    btn_sync_subs: '⚡ Sync L=R',
    btn_sync_subs_title: 'Set Sub R distance to match Sub L',
    btn_reset: '↺ Reset',
    btn_reset_confirm: '⚠️ Confirm?',
    btn_reset_title: 'Reset all fields to default parameters',
    crossover_alert: '⚠️ <strong>Filter Conflict:</strong> Sub HPF frequency is equal to or higher than Sub → Top crossover frequency!',
    hpf_header: 'Sub High-Pass Filter (HPF)',
    hpf_cutoff_label: 'HPF Cutoff Frequency',
    hpf_range_hint: 'Range: 20–150 Hz',
    xo_header: 'Sub → Top Crossover (XO)',
    xo_cutoff_label: 'Crossover Frequency',
    xo_range_hint: 'Range: 50–300 Hz',
    geom_header: 'Geometry & Environment',
    subL_label: 'Sub-L to Listener',
    subR_label: 'Sub-R to Listener',
    backlineDist_label: 'Stage Backline to PA Front',
    backline_hint_active: 'Acoustic drums/amps → PA front',
    backline_hint_disabled: 'Backline bypassed (No Band / Solo PA)',
    backline_switch_title: 'Toggle Stage Backline Alignment Delay (ON = Live Band / OFF = Solo PA)',
    temp_label: 'Ambient Temperature',
    speed_sound_prefix: 'Speed of sound:',
    topSubDist_label: 'Top-to-Sub Height (V)',
    micHeight_label: 'Measurement / Ear Height (H_mic)',
    micHeight_hint: 'RTA mic / FOH standing (m)',
    depthOffset_label: 'Voice Coil Depth Offset (+ = Top Forward / − = Recessed)',
    topTuning_label: 'Top Tuning Frequency (Fb)',
    topTuning_hint: 'JBL 2226H / reflex tuning (Hz)',
    geom_note: 'Vertical distance & mic height compute the true 3D hypotenuse propagation path. Depth offset is positive (+) if the Top driver is physically forward (closer to audience) than the Sub voice coil.',
    qref_title: 'Field Quick Reference',
    qref_speed: 'Speed of sound (configured temperature)',
    qref_input_delay: 'Input Delay: Stage Backline → PA',
    qref_step1: 'Step 1: Output delay → closer sub',
    qref_step2: 'Step 2: Output delay (0° Normal)',
    qref_step2_inv: 'Step 2: Output delay (180° Inverted)',
    qref_polarity_rec: 'Recommended Polarity Setting',
    qref_gd: 'Total Sub GD @ crossover freq',
    qref_phase: 'Total Sub Lead @ crossover freq',
    direct_title: 'Field Quick Direct Values',
    btn_nixie_toggle_title: 'Toggle Nixie Tube / Clean LCD Display Mode',
    input_delay_card_title: 'SYSTEM INPUT DELAY (BACKLINE)',
    polarity_title: 'POLARITY',
    pol_0_only: '0° ONLY',
    pol_allow_180: 'ALLOW 180°',
    pol_toggle_title: 'Toggle Polarity Inversion Allowance (0° Normal Only vs 180° Invert Allowed)',
    sub_left: 'SUB LEFT',
    sub_right: 'SUB RIGHT',
    top_left: 'TOP LEFT',
    top_right: 'TOP RIGHT',
    step1_header: 'Sub ↔ Sub Sync',
    step1_plate: 'OUTPUT DELAY · SUB-TO-SUB',
    step1_desc_matched: 'Subs are equidistant — no output delay needed.',
    step1_desc_delay: 'Add {ms} ms of OUTPUT channel delay to {side} (closer cabinet) so sub wavefronts arrive synchronized.',
    step1_bd_subL: 'Sub-L arrival time',
    step1_bd_subR: 'Sub-R arrival time',
    step1_bd_diff: 'Differential',
    step2_header: 'Top ↔ Sub Sync',
    step2_plate: 'OUTPUT DELAY · TOP-TO-SUB (0° NORMAL POLARITY)',
    step2_desc: 'Add {ms} ms of OUTPUT channel delay to the {target} (evaluating phase alignment at {freq}Hz).',
    step2_bd_dsp: 'DSP: Sub protective HPF group delay @ {freq}Hz',
    step2_bd_dsp_phase: 'DSP: Sub HPF phase lead @ {freq}Hz ({deg}°)',
    step2_bd_sub_phase: 'Acoustic: Sub phase wrap (SRC 400 LO @ 38Hz)',
    step2_bd_sub_phase_ang: 'Acoustic: Sub phase lead (SRC 400 LO @ 38Hz · {deg}°)',
    step2_bd_top_phase: 'Acoustic: Top phase wrap (JBL 2226H @ {freq}Hz)',
    step2_bd_top_phase_ang: 'Acoustic: Top phase lead (JBL 2226H @ {freq}Hz · {deg}°)',
    step2_bd_geom: 'Geometry: Top vs. Sub 3D path offset',
    step2_bd_total: 'Total delay to apply (0° Normal)',
    phase_header: 'Polarity Inversion & Acoustic Workaround',
    norm_opt_tag: '0° Normal Polarity',
    inv_opt_tag: '180° Inverted Polarity',
    target_prefix: 'Target:',
    within_limit: '✓ Within 10ms limit',
    exceeds_limit: '✕ Exceeds 10ms ceiling',
    phase_action_title: '🎛️ Crossover Menu Configuration Steps',
    phase_disclaimer_title_filter: '⚠️ Electro-Acoustic Alert: Inversion Required to Avoid Destructive Cancellation',
    phase_disclaimer_desc_filter: 'Even though Normal (0°) polarity shows a smaller delay number ({normDelay} ms), the <strong>{xoType} {xoOrder} dB/oct crossover filter</strong> inherently introduces a <strong>180° phase flip (phase opposition)</strong> between Sub and Top. Applying the smaller 0° delay aligns the drivers into <em>direct acoustic cancellation</em>, creating a <strong>deep cancellation notch (−∞ dB silence)</strong> at {freq} Hz. Inverting Sub polarity to 180° (with {invDelay} ms delay) corrects the filter phase shift, ensuring flat, constructive +6 dB acoustic summation.',
    phase_disclaimer_manual_link: '📖 View Full Electro-Acoustic Phase Physics in Manual (Tab 5) →',
    phase_bd_freq: 'Crossover Frequency (f<sub>xo</sub>)',
    phase_bd_period: 'Period:',
    phase_bd_half_wave: 'Half-Wavelength (&lambda;/2) Acoustic Shift',
    phase_bd_norm_req: 'Normal Polarity (0°) Required Delay',
    phase_bd_inv_req: 'Inverted Polarity (180°) Required Delay',
    flow_header: 'Signal Flow & Delay Routing',
    flow_fullscreen_title: 'Toggle Fullscreen Routing Diagram',
    fullscreen: 'Fullscreen',
    exit_fullscreen: 'Exit Fullscreen',
    listening_pos: 'LISTENER (RTA / FOH)',
    flow_step1_title: 'STEP 1 · SUB SYNC',
    stage_deck: 'FRONT PA LINE',
    stage_backline_zone: 'STAGE BACKLINE 🥁🎸',
    stage_backline_bypassed: 'BACKLINE (OFF)',
    input_delay_title: 'INPUT DELAY (BACKLINE)',
    depth_recessed: 'RECESSED',
    depth_flush: 'FLUSH',
    depth_forward: 'FORWARD',
    depth_label_svg: 'DEPTH',
    height_label_svg: 'HEIGHT',
    text_size_title: 'Text Size Calibration',
    text_size_plate: 'GLOBAL INTERFACE SCALE',
    preview_title: 'Live Preview',
    preview_sample: 'Sub HPF: 32.0 Hz · Crossover: 90.0 Hz · Sub L/R: 5.00 m',
    btn_done: '✓ Done',
    footer_text: 'Phase & Group delay computed from closed-form Butterworth pole positions. Acoustic phase shifts mapped to JBL 2226H (50Hz reflex) and Dynacord SRC 400 LO (38Hz reflex) profiles.',
    sub_pair: 'SUB pair',
    top_pair: 'TOP pair',
    matched: 'Matched',
    none_matched: 'None (matched)',
    badge_0_normal: '0° NORMAL',
    badge_180_inverted: '180° INVERTED',
    badge_auto_180: '⚠️ AUTO 180°',
    badge_limit_exceeded: '⚠️ LIMIT EXCEEDED',
    dir_note_0_strict: '0° Normal polarity strictly enforced (no phase flip).',
    dir_note_0_inphase: '0° Normal polarity optimal (in-phase crossover topology & full transient punch preserved).',
    dir_note_180_filter: '180° Inverted polarity applied (required by 2nd/6th-order crossover filter phase inversion).',
    dir_note_bw18_applied: '180° Inverted polarity applied + fine delay (bridges 270° 3rd-order Butterworth phase shift).',
    dir_note_180_workaround: '180° Inverted polarity applied (adjacent cycle workaround: saves DSP delay, slight transient smearing).',
    dir_note_180_applied: '180° Inverted polarity applied (required electro-acoustic filter phase alignment).',
    dir_note_auto_180: '⚠️ 0° Normal exceeds 10ms DSP ceiling! Automatically bypassed to 180° Inverted phase.',
    dir_note_both_exceed: '⚠️ Both 0° and 180° exceed 10ms limit — cabinet physical relocation required.',
    dir_note_0_optimal: '0° Normal polarity optimal (within standard delay budget).',
    rec_badge_180_filter: 'RECOMMENDED: INVERT SUB POLARITY (180° · 2nd-Order Filter Shift)',
    rec_short_180: 'Invert (180°)',
    rec_badge_bw18: 'RECOMMENDED: INVERT (180°) + FINE DELAY (90° · 3rd-Order Shift)',
    rec_short_180_fine: 'Invert + Fine Delay',
    rec_badge_rec: 'RECOMMENDED: INVERT SUB POLARITY (180°)',
    rec_short_rec: 'Invert (180°)',
    rec_badge_opt: '✓ NORMAL POLARITY OPTIMAL (0° · In-Phase Crossover)',
    rec_short_opt: 'Normal (0°)',
    rec_badge_workaround_180: '⚠️ DSP LIMIT WORKAROUND: INVERT (180° · Adjacent Cycle)',
    rec_short_workaround: 'Invert (Workaround)',
    rec_badge_alt: '180° POLARITY PROVIDES SHORTER DELAY',
    rec_short_alt: 'Invert (180°)',
    rec_badge_both: '✓ BOTH IN BUDGET · 0° NORMAL OPTIMAL',
    rec_short_both: 'Normal (0°)',
    rec_badge_warn: '⚠️ PHYSICAL RELOCATION REQUIRED',
    rec_short_warn: 'Move Cabinets',
    btn_manual: 'Manual',
    btn_manual_title: 'Measurement Manual & Field Guide',
    manual_modal_title: 'Measurement Manual & Field Guide',
    manual_tab_sub: 'Sub ↔ Listener',
    manual_tab_height: 'Top-Sub Height (V)',
    manual_tab_depth: 'Depth Offset',
    manual_tab_backline: 'Stage Backline',
    manual_tab_tips: 'Terminology & Tips',
    man_tag_start: '0 cm Start',
    man_tag_pull: 'Pull Tape',
    man_tag_target: 'Target End',
    man_tag_plumb: 'Plumb Line',
    man_tag_step_a: 'Step A: Baffle Setback',
    man_tag_step_b: 'Step B: Voice Coil Inset',
    man_tag_system_delay: 'Master Input Delay',
    man_sub_title: '1. Subwoofer to Listening Point (D_sub-L & D_sub-R)',
    man_sub_step1: '<strong>Place 0 cm tape tip at the exact acoustic center of the subwoofer front baffle:</strong><br>• <em>Dual-driver subwoofers (2×18"):</em> Position the tape end dead-center on the front grille, halfway between the centers of the top and bottom drivers.<br>• <em>Single-driver subwoofers (1×18" / 1×15"):</em> Position the tape end directly over the center of the driver\'s dust cap.',
    man_sub_step2: '<strong>Pull the measuring tape in a straight direct line of sight (line-of-propagation)</strong> from the subwoofer baffle to the designated listening position (FOH mix console or RTA measurement mic). Keep the tape taut without sagging.',
    man_sub_step3: '<strong>Read the distance at ear height (~1.6 m seated / ~1.75 m standing)</strong> or directly at the tip of the RTA measurement microphone diaphragm.',
    man_sub_note_title: '💡 Pro Sound Tip — L/R Symmetry:',
    man_sub_note_desc: 'Always measure Sub Left and Sub Right independently. Even a 34 cm distance delta produces a 1.0 ms arrival time difference that must be compensated in <em>Step 1 (Sub ↔ Sub Sync)</em> on the closer subwoofer.',
    man_height_title: '2. Top-to-Sub Vertical Height Offset (V)',
    man_height_step1: '<strong>Place 0 cm tape tip at the horizontal centerline / acoustic center of the Subwoofer:</strong><br>Align the tape with the center line of the subwoofer\'s front baffle.',
    man_height_step2: '<strong>Extend the tape vertically straight up (90° perpendicular to the floor/stage deck)</strong> along the speaker mounting pole or rigging support line.',
    man_height_step3: '<strong>Read the height at the acoustic center of the Top cabinet:</strong><br>Typically located at the vertical midpoint between the high-frequency horn throat and the mid-bass woofer cone.',
    man_height_math_title: '📐 Why Height (V) & Measurement Height (H_mic) Matter:',
    man_height_math_desc: 'Because the Top is elevated and the measurement mic is at standing height (default 1.75 m), DelCalc computes the true 3D diagonal path <code>D<sub>top</sub> = √(D<sub>sub</sub>² − H<sub>mic</sub>² + (V − H<sub>mic</sub>)²)</code>. This geometric path difference provides millimeter-accurate time-of-flight alignment.',
    man_depth_title: '3. Voice Coil Depth Offset',
    man_depth_step1: '<strong>Measure physical horizontal setback between front grilles:</strong><br>Drop a plumb line or hold a straight edge down from the Top front grille to the Sub front grille. Measure the horizontal distance between the two planes.',
    man_depth_step2: '<strong>Account for internal driver acoustic center depth:</strong><br>• <em>18" Subwoofers:</em> Deep cone places the voice coil ~10–15 cm behind the grille.<br>• <em>10"/12" Tops:</em> Shallower cone places the voice coil ~3–6 cm behind the grille.<br>• <em>Flush Grilles:</em> If grilles are physically flush, the Top 12" driver is physically closer to the audience than the 18" sub voice coil by ~8 cm. This is entered as <strong>+0.08 m</strong>.',
    man_depth_rule_title: '⚙️ Depth Offset Rule of Thumb:',
    man_depth_rule_desc: 'For standard pole-mounted tops with grilles aligned flush with the sub front, use <code>+0.08 m</code> (Top driver is closer to listener $\rightarrow$ receives positive delay). If the top is physically set back behind the sub on the top plate by 10 cm, enter <code>-0.02 m</code> (+0.08m voice coil offset − 0.10m setback).',
    man_backline_title: '4. Stage Backline Alignment Distance',
    man_backline_step1: '<strong>Place 0 cm tape tip at the unamplified acoustic sound source on stage:</strong><br>Usually the center of the acoustic snare drum or the front grille of the loudest guitar/bass amplifier on stage.',
    man_backline_step2: '<strong>Extend tape straight forward downstage</strong> along the center line to the front baffle plane of the main PA speakers (Stage Deck Front line).',
    man_backline_step3: '<strong>Apply this value to the System Input Delay (or Main Console Master Delay):</strong><br>Delaying the entire PA allows the direct acoustic sound of the drums to reach the PA line exactly as the electronic PA signal launches, delivering a punchy, unified transient.',
    man_tips_title: '5. Professional Audio Terminology & Best Practices',
    man_term_ac_title: 'Acoustic Center',
    man_term_ac_desc: 'The virtual spatial origin from which the acoustic wavefront appears to radiate (at or near the voice coil gap plane).',
    man_term_plumb_title: 'Plumb Line (Fir cu Plumb)',
    man_term_plumb_desc: 'A strictly vertical line (90° to earth/stage) used to reference depth setback and vertical height between elevated tops and ground subs.',
    man_term_hyp_title: 'Hypotenuse Path (D_hyp)',
    man_term_hyp_desc: 'The direct 3D diagonal acoustic sound path from an elevated top speaker to audience ear height: <code>D<sub>top</sub> = √(D<sub>sub</sub>² − H<sub>mic</sub>² + (V − H<sub>mic</sub>)²)</code>.',
    man_term_gd_title: 'Group Delay (GD) vs Phase Angle',
    man_term_gd_desc: 'Group Delay (τ_g = −dφ/dω) measures envelope slope, while Phase Angle (φ) measures instantaneous wave alignment. DelCalc supports both models with Mode A as default.',
    man_term_sum_title: 'Crossover Summation Zone',
    man_term_sum_desc: 'The frequency band around f<sub>xo</sub> where sub and top contribute equal acoustic energy. Phase alignment ensures +6 dB constructive summation.',
    man_term_laser_title: 'Laser Distance Measurer',
    man_term_laser_desc: 'When using a laser meter, hold the base against the cabinet grille center and shoot directly at the RTA microphone clipboard or FOH console hood.',
    man_temp_tip_title: '🌡️ Speed of Sound Tip:',
    man_temp_tip_desc: 'Remember that temperature shifts change the speed of sound (<code>c = 331.3 + 0.606 × T</code>). Always check and update the Ambient Temperature field for daytime vs nighttime outdoor festivals.',
    man_phase_rules_title: '🎛️ Electro-Acoustic Phase Inversion Rules',
    man_phase_rules_desc: '<p><strong>1. When to USE Phase Inversion (180°):</strong><br>• <strong>12 dB/Oct Crossovers (LR12 / BW12):</strong> 2nd-order filters introduce 90° LP lag + 90° HP lead = 180° phase flip. Inverting Sub polarity brings waveforms into 0° phase alignment.<br>• <strong>18 dB/Oct Crossovers (BW18):</strong> 3rd-order filters introduce 270° phase shift. Inverting polarity bridges 180°, leaving only 90° (&lambda;/4 fine delay) to be aligned.<br>• <strong>Acoustic Phase Wrap:</strong> When cabinet reflex tuning + 40Hz HPF + physical placement lands near 180° out of phase on an RTA mic.<br><br><strong>2. When NOT to USE Phase Inversion (Keep Normal 0°):</strong><br>• <strong>24 dB / 48 dB Linkwitz-Riley (LR24 / LR48):</strong> Mathematically in-phase (0°). Inverting polarity creates a destructive cancellation notch at crossover.<br>• <strong>Compensating 40Hz Protective HPF:</strong> HPF only introduces ~40°–45° (~1.2ms) delay. Never flip 180° for a 45° delay; compensate via time delay on the tops.<br>• <strong>Large Physical Distance Gaps:</strong> Never use 180° inversion to substitute for speaker distance; doing so destroys transient response and kick drum impulse punch.</p>',
    man_null_test_title: '🎯 Sine Wave Null Test Calibration Workflow',
    man_null_test_desc: '<ol style="margin-left:16px; padding-left:0;"><li><strong>Invert Sub Polarity:</strong> Set Subwoofer output polarity to <code>180° INVERTED</code> in your dbx / DSP crossover menu.</li><li><strong>Play Sine Wave:</strong> Generate a continuous sine wave at your exact crossover frequency (e.g. 90 Hz).</li><li><strong>Adjust Top Delay:</strong> Slowly spin the Output Delay dial for the Tops until the acoustic sound reaches the <em>deepest cancellation null (maximum silence)</em> in the room.</li><li><strong>Restore Normal Polarity:</strong> Switch Sub polarity back to <code>NORMAL (0°)</code>.</li><li><strong>Result:</strong> Tops and subs are now locked in perfect phase alignment with maximum constructive punch (+6 dB).</li></ol>',
    engine_selector_title: '🎛️ Acoustic Alignment Engine Model',
    engine_selector_desc: 'Select how DelCalc evaluates enclosure acoustic phase rotation and DSP crossover filter delay at crossover:',
    engine_opt_phase_title: 'Option A: Phase Angle Alignment (Smaart-Grade · Default)',
    engine_opt_phase_desc: 'Evaluates exact closed-form phase rotation Δφ(f_xo) between Sub and Top. Matches dual-channel FFT transfer function analyzers.',
    engine_opt_gd_title: 'Option B: Group Delay Envelope Slope (τ_g = −dφ/dω)',
    engine_opt_gd_desc: 'Evaluates envelope slope delay. Approximates phase alignment via group delay curves.',
    engine_badge_phase: 'MODE A: PHASE ANGLE (SMAART-GRADE)',
    engine_badge_gd: 'MODE B: GROUP DELAY (ENVELOPE SLOPE)'
  },
  ro: {
    lang_btn: 'RO',
    lang_btn_title: 'Switch language to English',
    btn_text_size_title: 'Ajustează dimensiunea textului',
    btn_theme_title: 'Comută tema luminoasă/întunecată',
    btn_theme_light: '☀️ Luminos',
    btn_theme_dark: '🌙 Întunecat',
    btn_sync_subs: '⚡ Sinc. L=R',
    btn_sync_subs_title: 'Setează distanța Sub R egală cu Sub L',
    btn_reset: '↺ Reset',
    btn_reset_confirm: '⚠️ Confirmare?',
    btn_reset_title: 'Resetează toate câmpurile la parametrii impliciți',
    crossover_alert: '⚠️ <strong>Conflict Filtre:</strong> Frecvența Sub HPF este mai mare sau egală cu frecvența de Crossover Sub → Top!',
    hpf_header: 'Sub High-Pass Filter (HPF)',
    hpf_cutoff_label: 'Frecvență Cutoff HPF',
    hpf_range_hint: 'Interval: 20–150 Hz',
    xo_header: 'Sub → Top Crossover (XO)',
    xo_cutoff_label: 'Frecvență Crossover',
    xo_range_hint: 'Interval: 50–300 Hz',
    geom_header: 'Geometrie & Mediu',
    subL_label: 'Sub-L până la Ascultător',
    subR_label: 'Sub-R până la Ascultător',
    backlineDist_label: 'Distanță Backline la Front PA',
    backline_hint_active: 'Tobe/amplificatoare acustice → front PA',
    backline_hint_disabled: 'Backline dezactivat (PA solo / DJ fără trupă)',
    backline_switch_title: 'Comută Delay Aliniere Backline Scenă (ON = Trupă live / OFF = PA Solo)',
    temp_label: 'Temperatură Ambientală',
    speed_sound_prefix: 'Viteza sunetului:',
    topSubDist_label: 'Înălțime Top-Sub (V)',
    micHeight_label: 'Înălțime Microfon / Ureche (H_mic)',
    micHeight_hint: 'Microfon RTA / în picioare (m)',
    depthOffset_label: 'Decalaj Adâncime Voice Coil (+ = Top în Față / − = în Spate)',
    topTuning_label: 'Frecvență Acordaj Top (Fb)',
    topTuning_hint: 'JBL 2226H / acordaj reflex (Hz)',
    geom_note: 'Distanța verticală și înălțimea microfonului calculează traseul 3D real de propagare pe ipotenuză. Decalajul este pozitiv (+) dacă difuzorul de Top este fizic mai în față (mai aproape de public) decât bobina Sub-ului.',
    qref_title: 'Ghid Rapid de Referință',
    qref_speed: 'Viteza sunetului (temperatura configurată)',
    qref_input_delay: 'Input Delay: Backline Scenă → PA',
    qref_step1: 'Pasul 1: Output delay → sub-ul mai apropiat',
    qref_step2: 'Pasul 2: Output delay (0° Normal)',
    qref_step2_inv: 'Pasul 2: Output delay (180° Inversat)',
    qref_polarity_rec: 'Setare Polaritate Recomandată',
    qref_gd: 'Group Delay total Sub @ frecv. crossover',
    qref_phase: 'Avans total fază Sub @ frecv. crossover',
    direct_title: 'Valori Directe de Lucru',
    btn_nixie_toggle_title: 'Comută Mod Afișaj Tuburi Nixie / LCD',
    input_delay_card_title: 'SYSTEM INPUT DELAY (BACKLINE)',
    polarity_title: 'POLARITATE',
    pol_0_only: 'DOAR 0°',
    pol_allow_180: 'PERMITE 180°',
    pol_toggle_title: 'Comută permisiunea de inversare polaritate (Doar 0° Normal vs Permite 180° Inversat)',
    sub_left: 'SUB STÂNGA',
    sub_right: 'SUB DREAPTA',
    top_left: 'TOP STÂNGA',
    top_right: 'TOP DREAPTA',
    step1_header: 'Sincronizare Sub ↔ Sub',
    step1_plate: 'OUTPUT DELAY · SUB-LA-SUB',
    step1_desc_matched: 'Subwooferele sunt echidistante — nu este necesar output delay.',
    step1_desc_delay: 'Adăugați {ms} ms de OUTPUT delay pe {side} (boxa mai apropiată) pentru ca fronturile de undă să ajungă sincronizate.',
    step1_bd_subL: 'Timp sosire Sub-L',
    step1_bd_subR: 'Timp sosire Sub-R',
    step1_bd_diff: 'Diferență',
    step2_header: 'Sincronizare Top ↔ Sub',
    step2_plate: 'OUTPUT DELAY · TOP-LA-SUB (POLARITATE 0° NORMAL)',
    step2_desc: 'Adăugați {ms} ms de OUTPUT delay pe {target} (evaluând alinierea de fază la {freq}Hz).',
    step2_bd_dsp: 'DSP: Group delay filtru protectiv Sub HPF @ {freq}Hz',
    step2_bd_dsp_phase: 'DSP: Avans fază filtru Sub HPF @ {freq}Hz ({deg}°)',
    step2_bd_sub_phase: 'Acustic: Rotație fază Sub (SRC 400 LO @ 38Hz)',
    step2_bd_sub_phase_ang: 'Acustic: Avans fază Sub (SRC 400 LO @ 38Hz · {deg}°)',
    step2_bd_top_phase: 'Acustic: Rotație fază Top (JBL 2226H @ {freq}Hz)',
    step2_bd_top_phase_ang: 'Acustic: Avans fază Top (JBL 2226H @ {freq}Hz · {deg}°)',
    step2_bd_geom: 'Geometrie: Decalaj traseu 3D Top vs. Sub',
    step2_bd_total: 'Delay total de aplicat (0° Normal)',
    phase_header: 'Inversare Polaritate & Soluție Acustică',
    norm_opt_tag: 'Polaritate Normală 0°',
    inv_opt_tag: 'Polaritate Inversată 180°',
    target_prefix: 'Țintă:',
    within_limit: '✓ În limita de 10ms',
    exceeds_limit: '✕ Depășește plafonul de 10ms',
    phase_action_title: '🎛️ Pași Configurare Meniu Crossover',
    phase_disclaimer_title_filter: '⚠️ Alertă Electro-Acustică: Inversare Obligatorie pentru Evitarea Anulării Destructive',
    phase_disclaimer_desc_filter: 'Deși polaritatea Normală (0°) afișează o valoare numerică mai mică de delay ({normDelay} ms), filtrul de crossover <strong>{xoType} {xoOrder} dB/oct</strong> introduce un <strong>defazaj inerent de 180° (opoziție de fază)</strong> între Sub și Top. Aplicarea delay-ului mai mic pe 0° aliniază difuzoarele în <em>anulare acustică directă</em>, provocând un <strong>gol adânc de anulare (−∞ dB / liniște)</strong> la {freq} Hz. Inversarea polarității Sub-ului la 180° (cu {invDelay} ms delay) compensează rotația filtrului, asigurând o însumare constructivă de +6 dB.',
    phase_disclaimer_manual_link: '📖 Vezi Explicația Detaliată a Fizicii de Fază în Manual (Tab 5) →',
    phase_bd_freq: 'Frecvență Crossover (f<sub>xo</sub>)',
    phase_bd_period: 'Perioadă:',
    phase_bd_half_wave: 'Decalaj Acustic Semi-Lungime de Undă (&lambda;/2)',
    phase_bd_norm_req: 'Delay Necesar Polaritate Normală (0°)',
    phase_bd_inv_req: 'Delay Necesar Polaritate Inversată (180°)',
    flow_header: 'Flux Semnal & Rutare Delay',
    flow_fullscreen_title: 'Comută diagramă rutare pe ecran complet',
    fullscreen: 'Ecran complet',
    exit_fullscreen: 'Ieșire',
    listening_pos: 'ASCULTĂTOR (RTA / FOH)',
    flow_step1_title: 'PASUL 1 · SINCRONIZARE SUB',
    stage_deck: 'LINIE FRONT PA',
    stage_backline_zone: 'BACKLINE 🥁🎸',
    stage_backline_bypassed: 'BACKLINE (OFF)',
    input_delay_title: 'INPUT DELAY (BACKLINE)',
    depth_recessed: 'ÎN SPATE',
    depth_flush: 'ALINIAT',
    depth_forward: 'ÎN FAȚĂ',
    depth_label_svg: 'ADÂNCIME',
    height_label_svg: 'ÎNĂLȚIME',
    text_size_title: 'Calibrare Dimensiune Text',
    text_size_plate: 'SCALĂ GLOBALĂ INTERFAȚĂ',
    preview_title: 'Previzualizare în Direct',
    preview_sample: 'Sub HPF: 32.0 Hz · Crossover: 90.0 Hz · Sub L/R: 5.00 m',
    btn_done: '✓ Gata',
    footer_text: 'Group delay și rotația de fază calculate pe baza polilor formulei closed-form Butterworth. Defazajele acustice sunt mapate pe profilele JBL 2226H (reflex 50Hz) și Dynacord SRC 400 LO (reflex 38Hz).',
    sub_pair: 'Perechea SUB',
    top_pair: 'Perechea TOP',
    matched: 'Echidistant',
    none_matched: 'Niciunul (echidistant)',
    badge_0_normal: '0° NORMAL',
    badge_180_inverted: '180° INVERSAT',
    badge_auto_180: '⚠️ AUTO 180°',
    badge_limit_exceeded: '⚠️ LIMITĂ DEPĂȘITĂ',
    dir_note_0_strict: 'Polaritate Normală 0° aplicată strict (fără inversare de fază).',
    dir_note_0_inphase: 'Polaritate Normală 0° optimă (topologie crossover în fază & atac tranzitoriu păstrat).',
    dir_note_180_filter: 'Polaritate Inversată 180° aplicată (necesară datorită defazajului de 180° al filtrelor de ordinul 2/6).',
    dir_note_bw18_applied: 'Polaritate Inversată 180° + reglaj fin de delay aplicat (compensează defazajul de 270° Butterworth ordin 3).',
    dir_note_180_workaround: 'Polaritate Inversată 180° aplicată (compromis ciclu adiacent: economisește delay DSP, atac tranzitoriu diminuat).',
    dir_note_180_applied: 'Polaritate Inversată 180° aplicată (aliniere necesară de fază electro-acustică a filtrelor).',
    dir_note_auto_180: '⚠️ Polaritatea Normală 0° depășește limita DSP de 10ms! Comutat automat pe faza Inversată 180°.',
    dir_note_both_exceed: '⚠️ Atât 0° cât și 180° depășesc limita de 10ms — este necesară repoziționarea fizică a boxelor.',
    dir_note_0_optimal: 'Polaritate Normală 0° optimă (în limita standard de delay).',
    rec_badge_180_filter: 'RECOMANDAT: INVERSARE POLARITATE SUB (180° · Defazaj Filtru Ordin 2)',
    rec_short_180: 'Inversare (180°)',
    rec_badge_bw18: 'RECOMANDAT: INVERSARE (180°) + REGLAJ FIN DELAY (90° · Filtru Ordin 3)',
    rec_short_180_fine: 'Inversare + Reglaj Fin',
    rec_badge_rec: 'RECOMANDAT: INVERSARE POLARITATE SUB (180°)',
    rec_short_rec: 'Inversare (180°)',
    rec_badge_opt: '✓ POLARITATE NORMALĂ OPTIMĂ (0° · Crossover În Fază)',
    rec_short_opt: 'Normal (0°)',
    rec_badge_workaround_180: '⚠️ COMPROMIS LIMITĂ DSP: INVERSARE (180° · Ciclu Adiacent)',
    rec_short_workaround: 'Inversare (Compromis)',
    rec_badge_alt: 'POLARITATEA 180° OFERĂ UN DELAY MAI SCURT',
    rec_short_alt: 'Inversare (180°)',
    rec_badge_both: '✓ AMBELE ÎN LIMITĂ · 0° NORMAL OPTIM',
    rec_short_both: 'Normal (0°)',
    rec_badge_warn: '⚠️ REPOZIȚIONARE FIZICĂ NECESARĂ',
    rec_short_warn: 'Repoziționare Boxe',
    btn_manual: 'Manual',
    btn_manual_title: 'Ghid & Manual de Măsurare pe Teren',
    manual_modal_title: 'Manual & Ghid de Măsurare',
    manual_tab_sub: 'Sub ↔ Ascultător',
    manual_tab_height: 'Înălțime Top-Sub (V)',
    manual_tab_depth: 'Decalaj Adâncime',
    manual_tab_backline: 'Backline Scenă',
    manual_tab_tips: 'Terminologie & Sfaturi',
    man_tag_start: '0 cm Start',
    man_tag_pull: 'Întindere Ruletă',
    man_tag_target: 'Punct Țintă',
    man_tag_plumb: 'Fir cu Plumb',
    man_tag_step_a: 'Pasul A: Decalaj Baffle',
    man_tag_step_b: 'Pasul B: Adâncime Bobină',
    man_tag_system_delay: 'Input Delay Master',
    man_sub_title: '1. Distanță Subwoofer la Punctul de Ascultare (D_sub-L & D_sub-R)',
    man_sub_step1: '<strong>Plasați capătul de 0 cm al ruletei exact în centrul acustic al măștii frontale a subwooferului:</strong><br>• <em>Subwoofere duble (2×18"):</em> Poziționați capătul ruletei la mijlocul cabinetului, exact între centrele celor două difuzoare.<br>• <em>Subwoofere simple (1×18" / 1×15"):</em> Poziționați capătul direct pe grilă, în dreptul calotei centrale (dust cap) a difuzorului.',
    man_sub_step2: '<strong>Trageți ruleta în linie dreaptă pe traseul direct de propagare (line-of-sight)</strong> de la grila subwooferului către poziția desemnată de ascultare (pupitru FOH sau microfon de măsurare RTA). Țineți ruleta bine întinsă, fără curburi.',
    man_sub_step3: '<strong>Citiți distanța la nivelul urechii ascultătorului (~1.6 m așezat / ~1.75 m în picioare)</strong> sau direct la capsula microfonului de măsurare RTA.',
    man_sub_note_title: '💡 Sfat Profesional — Simetrie L/R:',
    man_sub_note_desc: 'Măsurați întotdeauna Sub Stânga și Sub Dreapta independent. O diferență de doar 34 cm introduce o asimetrie de sosire de 1.0 ms ce trebuie compensată în <em>Pasul 1 (Sincronizare Sub ↔ Sub)</em> pe subwooferul mai apropiat.',
    man_height_title: '2. Înălțime / Decalaj Vertical Top-Sub (V)',
    man_height_step1: '<strong>Plasați capătul de 0 cm al ruletei pe linia mediană / centrul acustic al Subwooferului:</strong><br>Aliniați ruleta cu centrul grilei frontale a cabinetului de bas.',
    man_height_step2: '<strong>Extindeți ruleta vertical în sus (la 90° perpendicular pe podea/scenă)</strong> de-a lungul distanțierului sau tijei de susținere a boxei.',
    man_height_step3: '<strong>Citiți înălțimea la centrul acustic al cabinetului de Top:</strong><br>Situat de regulă la punctul median dintre goarna de înalte HF și difuzorul de medii-joase LF.',
    man_height_math_title: '📐 De ce contează Înălțimea (V) & Înălțimea Microfonului (H_mic):',
    man_height_math_desc: 'Deoarece Topul este suspendat la înălțime și microfonul de măsurare este la nivelul urechii (implicit 1.75 m), DelCalc calculează traseul 3D real pe ipotenuză <code>D<sub>top</sub> = √(D<sub>sub</sub>² − H<sub>mic</sub>² + (V − H<sub>mic</sub>)²)</code>. Această diferență geometrică asigură o aliniere la nivel de milimetru.',
    man_depth_title: '3. Decalaj de Adâncime Voice Coil',
    man_depth_step1: '<strong>Măsurați decalajul orizontal dintre grilele frontale:</strong><br>Coborâți un fir cu plumb sau țineți o riglă verticală de la grila frontală a Topului până la nivelul grilei Subwooferului. Măsurați distanța orizontală dintre cele două plane.',
    man_depth_step2: '<strong>Luați în calcul adâncimea internă a bobinelor (voice coil):</strong><br>• <em>Subwoofere de 18":</em> Conul adânc plasează bobina la ~10–15 cm în spatele grilei.<br>• <em>Topuri de 10"/12":</em> Conul mai plat plasează bobina la ~3–6 cm în spatele grilei.<br>• <em>Grile aliniate la față:</em> Dacă grilele sunt fizic aliniate, difuzorul de Top de 12" este fizic mai aproape de public decât bobina Sub-ului de 18" cu ~8 cm. Valoarea se introduce ca <strong>+0.08 m</strong>.',
    man_depth_rule_title: '⚙️ Regulă Practică Decalaj Adâncime:',
    man_depth_rule_desc: 'Pentru topuri standard montate pe distanțier cu grila aliniată la fața subwooferului, folosiți <code>+0.08 m</code> (difuzorul de top este mai aproape $\rightarrow$ primește delay pozitiv). Dacă topul este așezat mai în spate pe capacul subului cu 10 cm, introduceți <code>-0.02 m</code> (+0.08m decalaj bobină − 0.10m retragere).',
    man_backline_title: '4. Distanță Backline Scenă la Front PA',
    man_backline_step1: '<strong>Plasați capătul de 0 cm al ruletei la sursa acustică neamplificată de pe scenă:</strong><br>De obicei centrul tobei mici (snare drum) sau grila celui mai puternic amplificator de chitară/bas.',
    man_backline_step2: '<strong>Extindeți ruleta în față spre buza scenei</strong> pe linia mediană până la planul frontal al boxelor PA principale (linia Front PA).',
    man_backline_step3: '<strong>Aplicați această valoare pe System Input Delay (sau Master Delay consolă):</strong><br>Întârzierea întregului sistem PA permite sunetului acustic direct al tobelor să ajungă la linia boxelor exact când pleacă semnalul PA amplificat, oferind un atac percutant și unificat.',
    man_tips_title: '5. Terminologie Profesională & Bune Practici',
    man_term_ac_title: 'Centru Acustic',
    man_term_ac_desc: 'Originea spațială virtuală din care pare să radieze frontul de undă acustică (la sau în apropierea bobinei difuzorului).',
    man_term_plumb_title: 'Fir cu Plumb (Plumb Line)',
    man_term_plumb_desc: 'O linie perfect verticală (90° față de sol/scenă) folosită pentru referențierea decalajului de adâncime și a înălțimii dintre top și sub.',
    man_term_hyp_title: 'Traseu Ipotenuză (D_hyp)',
    man_term_hyp_desc: 'Traseul acustic 3D diagonal direct parcurs de la topul suspendat până la înălțimea microfonului: <code>D<sub>top</sub> = √(D<sub>sub</sub>² − H<sub>mic</sub>² + (V − H<sub>mic</sub>)²)</code>.',
    man_term_gd_title: 'Group Delay (GD) vs Unghi de Fază',
    man_term_gd_desc: 'Group Delay (τ_g = −dφ/dω) măsoară panta anvelopei, în timp ce Unghiul de Fază (φ) măsoară alinierea instantanee a undei. DelCalc suportă ambele modele, cu Modul A ca opțiune implicită.',
    man_term_sum_title: 'Zonă Însumare Crossover',
    man_term_sum_desc: 'Banda de frecvențe din jurul frecvenței f<sub>xo</sub> unde subul și topul emit energie acustică egală. Alinierea de fază asigură o însumare constructivă de +6 dB.',
    man_term_laser_title: 'Telemetru Laser',
    man_term_laser_desc: 'La utilizarea unui telemetru laser, sprijiniți baza pe centrul grilei boxei și țintiți direct clipboard-ul microfonului RTA sau consola FOH.',
    man_temp_tip_title: '🌡️ Sfat Viteza Sunetului:',
    man_temp_tip_desc: 'Variațiile de temperatură modifică viteza sunetului (<code>c = 331.3 + 0.606 × T</code>). Verificați și actualizați întotdeauna câmpul Temperatură Ambientală între zi și noapte la evenimentele în aer liber.',
    man_phase_rules_title: '🎛️ Reguli Electro-Acustice pentru Inversarea Polarității',
    man_phase_rules_desc: '<p><strong>1. Când se UTILIZEAZĂ Inversarea de Polaritate (180°):</strong><br>• <strong>Crossovere 12 dB/Oct (LR12 / BW12):</strong> Filtrele de ordinul 2 introduc 90° lag sub + 90° lead top = defazaj de 180°. Inversarea polarității aduce undele în fază la 0°.<br>• <strong>Crossovere 18 dB/Oct (BW18):</strong> Filtrele de ordinul 3 introduc un defazaj de 270°. Inversarea polarității acoperă 180°, rămânând doar 90° (&lambda;/4) pentru reglaj fin de delay.<br>• <strong>Rotație Acustică de Fază:</strong> Când acordajul bass-reflex + filtrul HPF 40Hz + distanța fizică produc o anulare de 180° pe microfonul RTA.<br><br><strong>2. Când NU se UTILIZEAZĂ Inversarea (Păstrare Normal 0°):</strong><br>• <strong>Linkwitz-Riley 24 dB / 48 dB (LR24 / LR48):</strong> Filtrele sunt matematic în fază (0°). Inversarea creează un gol masiv de anulare la frecvența de crossover.<br>• <strong>Compensare Filtru Sub HPF 40Hz:</strong> HPF-ul introduce doar ~40°–45° (~1.2ms) group delay. Nu inversați 180° pentru 45°; compensați prin delay pe topuri.<br>• <strong>Distanțe Fizice Mari:</strong> Nu folosiți inversarea ca scurtătură pentru distanța dintre boxe; cuplarea pe ciclul adiacent distruge atacul tranzitoriu al tobei mari.</p>',
    man_null_test_title: '🎯 Ghid de Calibrare pe Teren: Testul de Nul (Sine Wave Null Test)',
    man_null_test_desc: '<ol style="margin-left:16px; padding-left:0;"><li><strong>Inversați Polaritatea Sub-ului:</strong> Setați polaritatea canalului de Sub pe <code>INVERTED (180°)</code> în meniul crossover dbx / DSP.</li><li><strong>Redați Semnal Sinusoidal:</strong> Generați un ton sinusoidal pur la frecvența exactă de crossover (ex. 90 Hz).</li><li><strong>Ajustați Delay-ul pe Topuri:</strong> Rotiți fin potențiometrul de delay pe Topuri până obțineți <em>anularea acustică maximă (liniște / nul acustic complet)</em> în sală.</li><li><strong>Reveniți la Polaritate Normală:</strong> Comutați polaritatea sub-ului înapoi pe <code>NORMAL (0°)</code>.</li><li><strong>Rezultat:</strong> Topurile și subwooferele sunt acum perfect sincronizate în fază (+6 dB însumare constructivă).</li></ol>',
    engine_selector_title: '🎛️ Model Motor Aliniere Acustică',
    engine_selector_desc: 'Selectați modul în care DelCalc evaluează defazajul acustic al incintei și delay-ul filtrului DSP la crossover:',
    engine_opt_phase_title: 'Opțiunea A: Aliniere pe Unghi de Fază (Nivel Smaart · Implicit)',
    engine_opt_phase_desc: 'Calculează defazajul exact closed-form Δφ(f_xo) dintre Sub și Top. Corespunde analizorului FFT cu două canale.',
    engine_opt_gd_title: 'Opțiunea B: Panta Plicului de Group Delay (τ_g = −dφ/dω)',
    engine_opt_gd_desc: 'Evaluează întârzierea pantei de anvelopă. Aproximează alinierea de fază prin curbele de group delay.',
    engine_badge_phase: 'MODUL A: UNGHI DE FAZĂ (NIVEL SMAART)',
    engine_badge_gd: 'MODUL B: GROUP DELAY (PANTA ANVELOPEI)'
  }
};

function t(key, params = {}) {
  const lang = state.lang || 'en';
  let str = (i18n[lang] && i18n[lang][key]) || (i18n.en && i18n.en[key]) || key;
  for (const [k, v] of Object.entries(params)) {
    str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), v);
  }
  return str;
}

function applyLanguage(lang) {
  if (lang !== 'en' && lang !== 'ro') lang = 'en';
  state.lang = lang;
  document.documentElement.lang = lang;

  const btnLangVal = document.getElementById('btnLangVal');
  if (btnLangVal) btnLangVal.textContent = lang === 'ro' ? 'RO' : 'EN';
  const btnLang = document.getElementById('btnLang');
  if (btnLang) {
    btnLang.title = t('lang_btn_title');
    btnLang.setAttribute('aria-label', t('lang_btn_title'));
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (i18n[lang] && i18n[lang][key]) el.innerHTML = i18n[lang][key];
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.dataset.i18nTitle;
    if (i18n[lang] && i18n[lang][key]) el.title = i18n[lang][key];
  });

  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (btnTheme) {
    const icon = isLight ? '🌙' : '☀️';
    const text = isLight 
      ? (lang === 'ro' ? 'Întunecat' : 'Dark') 
      : (lang === 'ro' ? 'Luminos' : 'Light');
    btnTheme.innerHTML = `<span class="theme-icon" id="themeIcon">${icon}</span> <span class="theme-label" id="themeLabel">${text}</span>`;
    btnTheme.title = isLight
      ? (lang === 'ro' ? 'Comută la Tema Întunecată' : 'Switch to Dark Theme')
      : (lang === 'ro' ? 'Comută la Tema Luminoasă' : 'Switch to Light Theme');
  }

  if (polSwitchHint && polSwitchEl) {
    const isTop = polSwitchEl.dataset.pos === 'top';
    polSwitchHint.textContent = isTop ? t('pol_0_only') : t('pol_allow_180');
  }

  const engineBadgeEl = document.getElementById('engineBadge');
  if (engineBadgeEl) {
    engineBadgeEl.textContent = state.calcMode === 'phase' ? t('engine_badge_phase') : t('engine_badge_gd');
  }

  try { localStorage.setItem('delcalc_lang', lang); } catch (e) {}
  recalc();
}

const ORDER_OPTIONS = {
  BW: [
    { order: 1, label: '6', sub: '1st', dbPerOct: 6, desc: '6 dB/oct' },
    { order: 2, label: '12', sub: '2nd', dbPerOct: 12, desc: '12 dB/oct' },
    { order: 3, label: '18', sub: '3rd', dbPerOct: 18, desc: '18 dB/oct' },
    { order: 4, label: '24', sub: '4th', dbPerOct: 24, desc: '24 dB/oct' },
    { order: 6, label: '36', sub: '6th', dbPerOct: 36, desc: '36 dB/oct' },
    { order: 8, label: '48', sub: '8th', dbPerOct: 48, desc: '48 dB/oct' }
  ],
  LR: [
    { order: 2, label: '12', sub: 'LR2', dbPerOct: 12, desc: 'LR 12dB' },
    { order: 4, label: '24', sub: 'LR4', dbPerOct: 24, desc: 'LR 24dB' },
    { order: 6, label: '36', sub: 'LR6', dbPerOct: 36, desc: 'LR 36dB' },
    { order: 8, label: '48', sub: 'LR8', dbPerOct: 48, desc: 'LR 48dB' }
  ]
};

const ARC_START = -135;
const ARC_END = 135;
const ARC_RANGE = ARC_END - ARC_START;

function makeScallopPath(cx, cy, rBase, amp, lobes, steps = 96) {
  let pts = [];
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * 2 * Math.PI;
    const r = rBase + amp * Math.cos(lobes * angle);
    const x = (cx + r * Math.sin(angle)).toFixed(2);
    const y = (cy - r * Math.cos(angle)).toFixed(2);
    pts.push((i === 0 ? 'M ' : 'L ') + x + ' ' + y);
  }
  return pts.join(' ') + ' Z';
}

const scallopPathD = makeScallopPath(58, 58, 53, 4.5, 12, 96);
document.getElementById('hpfSkirtPath').setAttribute('d', scallopPathD);
document.getElementById('xoSkirtPath').setAttribute('d', scallopPathD);

function butterworthGD(order, fcHz, freqHz){
  if(fcHz <= 0 || freqHz <= 0) return 0;
  const wc = 2*Math.PI*fcHz;
  const w  = 2*Math.PI*freqHz;
  let gd = 0;
  for(let k=1; k<=order; k++){
    const theta = Math.PI*(2*k+order-1)/(2*order);
    const a = wc*Math.cos(theta);
    const b = wc*Math.sin(theta);
    gd += (-a)/(a*a + (w-b)*(w-b));
  }
  return gd;
}

function filterGD(topology, order, fcHz, freqHz){
  if(topology==='LR'){
    const half = order/2;
    return 2*butterworthGD(half, fcHz, freqHz);
  }
  return butterworthGD(order, fcHz, freqHz);
}

// Closed-form Phase Response Functions (Mode A: Exact Phase Angle Alignment)
function butterworthHPPhaseDeg(order, fcHz, freqHz) {
  if (fcHz <= 0 || freqHz <= 0) return 0;
  const u = freqHz / fcHz;
  let denomPhaseRad = 0;
  for (let k = 1; k <= order; k++) {
    const theta = Math.PI * (2 * k + order - 1) / (2 * order);
    const a = Math.cos(theta); // negative
    const b = Math.sin(theta);
    denomPhaseRad += Math.atan2(u - b, -a);
  }
  const numPhaseDeg = order * 90;
  const denomPhaseDeg = (denomPhaseRad * 180) / Math.PI;
  let phaseDeg = (numPhaseDeg - denomPhaseDeg) % 360;
  if (phaseDeg < 0) phaseDeg += 360;
  return phaseDeg;
}

function filterPhaseShiftDeg(topology, order, fcHz, freqHz) {
  if (topology === 'LR') {
    const half = order / 2;
    return (2 * butterworthHPPhaseDeg(half, fcHz, freqHz)) % 360;
  }
  return butterworthHPPhaseDeg(order, fcHz, freqHz);
}

function enclosurePhaseDeg(tuningFb, freqHz) {
  // 4th-order acoustic behavior of vented bass-reflex enclosure
  return butterworthHPPhaseDeg(4, tuningFb, freqHz);
}

function getCrossoverFilterPhaseShift(topology, order){
  // Relative phase shift between Low-Pass (Sub) and High-Pass (Top) at crossover frequency fc
  // N=1 (BW6): 90°
  // N=2 (BW12, LR12): 180° (Inverted relative phase)
  // N=3 (BW18): 270° (Inverted 180° + 90° fine delay)
  // N=4 (BW24, LR24): 360° ≡ 0° (In-phase)
  // N=6 (BW36, LR36): 540° ≡ 180° (Inverted relative phase)
  // N=8 (BW48, LR48): 720° ≡ 0° (In-phase)
  return (order * 90) % 360;
}

function speedOfSound(tempC){ return 331.3 + 0.606*tempC; }

const hpfFreqEl = document.getElementById('hpfFreq');
const xoFreqEl = document.getElementById('xoFreq');
const subLEl = document.getElementById('subL');
const subREl = document.getElementById('subR');
const backlineDistEl = document.getElementById('backlineDist');
const backlineSwitchEl = document.getElementById('backlineSwitch');
const backlineLabelOn = document.getElementById('backlineLabelOn');
const backlineLabelOff = document.getElementById('backlineLabelOff');
const backlineHintEl = document.getElementById('backlineHint');
const backlineStepperEl = document.getElementById('backlineStepper');
const topSubDistEl = document.getElementById('topSubDist');
const micHeightEl = document.getElementById('micHeight');
const depthOffsetEl = document.getElementById('depthOffset');
const topTuningEl = document.getElementById('topTuning');
const tempEl = document.getElementById('temp');
const speedHintEl = document.getElementById('speedHint');
const crossoverAlertEl = document.getElementById('crossoverAlert');
const hpfSlopeBadge = document.getElementById('hpfSlopeBadge');
const xoSlopeBadge = document.getElementById('xoSlopeBadge');
const btnNixieMatrixToggle = document.getElementById('btnNixieMatrixToggle');
const nixieToggleIcon = document.getElementById('nixieToggleIcon');
const nixieToggleText = document.getElementById('nixieToggleText');
const btnEnginePhase = document.getElementById('btnEnginePhase');
const btnEngineGD = document.getElementById('btnEngineGD');
const engineBadge = document.getElementById('engineBadge');

class RotaryKnobController {
  constructor(filterKey, containerEl, rotorEl, ticksSvgEl, valueEl) {
    this.filterKey = filterKey;
    this.containerEl = containerEl;
    this.rotorEl = rotorEl;
    this.ticksSvgEl = ticksSvgEl;
    this.valueEl = valueEl;
    this.dragging = false;
    this.currentAngle = ARC_START;
    this.detents = [];
    this.tickLines = [];
    this.tickLabels = [];

    this._bindEvents();
    this.updateDetents();
  }

  get topology() { return this.filterKey === 'hpf' ? state.hpfType : state.xoType; }
  get order() { return this.filterKey === 'hpf' ? state.hpfOrder : state.xoOrder; }
  set order(v) {
    if(this.filterKey === 'hpf') state.hpfOrder = v;
    else state.xoOrder = v;
  }

  updateDetents() {
    const options = ORDER_OPTIONS[this.topology];
    const n = options.length;
    this.detents = options.map((opt, i) => ({
      angle: n === 1 ? 0 : ARC_START + (ARC_RANGE * i / (n - 1)),
      ...opt
    }));

    let idx = this.detents.findIndex(d => d.order === this.order);
    if(idx < 0) {
      idx = 0;
      this.order = this.detents[0].order;
    }
    this.currentAngle = this.detents[idx].angle;
    this._renderTicks();
    this._applyAngle(idx);
  }

  _renderTicks() {
    this.ticksSvgEl.innerHTML = '';
    this.tickLines = [];
    this.tickLabels = [];

    const cx = 80;
    const cy = 80;
    const r1 = 56.0;
    const r2 = 63.5;
    const rLbl = 73.0;
    const activeIdx = this.detents.findIndex(d => d.order === this.order);

    this.detents.forEach((det, i) => {
      const rad = det.angle * Math.PI / 180;
      const x1 = (cx + r1 * Math.sin(rad)).toFixed(2);
      const y1 = (cy - r1 * Math.cos(rad)).toFixed(2);
      const x2 = (cx + r2 * Math.sin(rad)).toFixed(2);
      const y2 = (cy - r2 * Math.cos(rad)).toFixed(2);
      const lx = (cx + rLbl * Math.sin(rad)).toFixed(2);
      const ly = (cy - rLbl * Math.cos(rad)).toFixed(2);

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      line.setAttribute('class', 'svg-dial-tick knob-tick' + (i === activeIdx ? ' active' : ''));
      this.ticksSvgEl.appendChild(line);
      this.tickLines.push(line);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', lx);
      text.setAttribute('y', ly);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'central');
      text.setAttribute('class', 'svg-dial-label knob-tick-label' + (i === activeIdx ? ' active' : ''));
      text.textContent = det.label;
      this.ticksSvgEl.appendChild(text);
      this.tickLabels.push(text);
    });
  }

  _applyAngle(idx) {
    this.rotorEl.style.transform = `rotate(${this.detents[idx].angle}deg)`;
    this.valueEl.textContent = this.detents[idx].desc;

    const badge = this.filterKey === 'hpf' ? hpfSlopeBadge : xoSlopeBadge;
    if(badge) badge.textContent = this.detents[idx].desc;

    this.tickLines.forEach((l, i) => l.classList.toggle('active', i === idx));
    this.tickLabels.forEach((t, i) => t.classList.toggle('active', i === idx));
  }

  _snapToNearest(angle) {
    let closestIdx = 0;
    let minDiff = Infinity;
    this.detents.forEach((d, i) => {
      const diff = Math.abs(d.angle - angle);
      if(diff < minDiff){
        minDiff = diff;
        closestIdx = i;
      }
    });

    this.currentAngle = this.detents[closestIdx].angle;
    this.order = this.detents[closestIdx].order;
    this._applyAngle(closestIdx);
    recalc();
  }

  _bindEvents() {
    const onStart = (e) => {
      e.preventDefault();
      this.dragging = true;
      this.rotorEl.setPointerCapture(e.pointerId);
    };

    const onMove = (e) => {
      if(!this.dragging) return;
      const rect = this.rotorEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      let angle = Math.atan2(dx, -dy) * (180 / Math.PI);
      angle = Math.max(ARC_START, Math.min(ARC_END, angle));
      this.currentAngle = angle;
      this.rotorEl.style.transform = `rotate(${angle}deg)`;
    };

    const onEnd = () => {
      if(!this.dragging) return;
      this.dragging = false;
      this._snapToNearest(this.currentAngle);
    };

    this.rotorEl.addEventListener('pointerdown', onStart);
    this.rotorEl.addEventListener('pointermove', onMove);
    this.rotorEl.addEventListener('pointerup', onEnd);
    this.rotorEl.addEventListener('pointercancel', onEnd);

    let tapStartAngle = 0;
    this.rotorEl.addEventListener('pointerdown', () => { tapStartAngle = this.currentAngle; });
    this.rotorEl.addEventListener('click', () => {
      if(Math.abs(this.currentAngle - tapStartAngle) < 3) {
        const curIdx = this.detents.findIndex(d => d.order === this.order);
        const nextIdx = (curIdx + 1) % this.detents.length;
        this.currentAngle = this.detents[nextIdx].angle;
        this.order = this.detents[nextIdx].order;
        this._applyAngle(nextIdx);
        recalc();
      }
    });
  }
}

function setupVintageSwitch(trackEl, labelTopEl, labelBotEl, filterKey, knobInstance) {
  trackEl.addEventListener('click', () => {
    const isTop = trackEl.dataset.pos === 'top';
    trackEl.dataset.pos = isTop ? 'bottom' : 'top';
    labelTopEl.classList.toggle('active', !isTop);
    labelBotEl.classList.toggle('active', isTop);

    if(filterKey === 'hpf'){
      state.hpfType = isTop ? 'LR' : 'BW';
    } else {
      state.xoType = isTop ? 'LR' : 'BW';
    }

    knobInstance.updateDetents();
    recalc();
  });
}

const SEG16_MAP = {
  '0': ['a1', 'a2', 'b', 'c', 'd1', 'd2', 'e', 'f'],
  '1': ['b', 'c'],
  '2': ['a1', 'a2', 'b', 'g1', 'g2', 'e', 'd1', 'd2'],
  '3': ['a1', 'a2', 'b', 'g2', 'c', 'd1', 'd2'],
  '4': ['f', 'g1', 'g2', 'b', 'c'],
  '5': ['a1', 'a2', 'f', 'g1', 'g2', 'c', 'd1', 'd2'],
  '6': ['a1', 'a2', 'f', 'e', 'd1', 'd2', 'c', 'g1', 'g2'],
  '7': ['a1', 'a2', 'b', 'c'],
  '8': ['a1', 'a2', 'b', 'c', 'd1', 'd2', 'e', 'f', 'g1', 'g2'],
  '9': ['a1', 'a2', 'b', 'c', 'd1', 'd2', 'f', 'g1', 'g2'],
  '-': ['g1', 'g2'],
  ' ': [],
  'm': ['e', 'f', 'h', 'j', 'b', 'c'],
  's': ['a1', 'a2', 'f', 'g1', 'g2', 'c', 'd1', 'd2'],
  'O': ['a1', 'a2', 'b', 'c', 'd1', 'd2', 'e', 'f'],
  'K': ['e', 'f', 'g1', 'j', 'k'],
  'N': ['e', 'f', 'h', 'k', 'b', 'c'],
  'o': ['a1', 'a2', 'b', 'c', 'd1', 'd2', 'e', 'f'],
  'k': ['e', 'f', 'g1', 'j', 'k'],
  'n': ['e', 'f', 'h', 'k', 'b', 'c'],
  '✓': ['e', 'm', 'j'],
  '✕': ['h', 'j', 'k', 'm']
};

const SEG16_PATHS = {
  a1: 'M 5 3.5 L 14.5 3.5 L 13 7.5 L 6.5 7.5 Z',
  a2: 'M 17.5 3.5 L 27 3.5 L 25.5 7.5 L 19 7.5 Z',
  b:  'M 28.5 4.5 L 28.5 21.5 L 25 19.5 L 25 6 Z',
  c:  'M 28.5 24.5 L 28.5 41.5 L 25 40 L 25 26.5 Z',
  d2: 'M 19 38.5 L 25.5 38.5 L 27 42.5 L 17.5 42.5 Z',
  d1: 'M 6.5 38.5 L 13 38.5 L 14.5 42.5 L 5 42.5 Z',
  e:  'M 3.5 24.5 L 7 26.5 L 7 40 L 3.5 41.5 Z',
  f:  'M 3.5 4.5 L 7 6 L 7 19.5 L 3.5 21.5 Z',
  g1: 'M 6.5 21.5 L 14.5 21.5 L 13 24.5 L 6.5 24.5 Z',
  g2: 'M 17.5 21.5 L 25.5 21.5 L 25.5 24.5 L 19 24.5 Z',
  h:  'M 8 7.5 L 13.5 19 L 11 20.5 L 5.5 9 Z',
  i:  'M 14.7 5.0 L 17.3 5.0 L 17.3 20.5 L 14.7 20.5 Z',
  j:  'M 24 7.5 L 26.5 9 L 21 20.5 L 18.5 19 Z',
  k:  'M 18.5 27 L 21 25.5 L 26.5 37 L 24 38.5 Z',
  l:  'M 14.7 25.5 L 17.3 25.5 L 17.3 41.0 L 14.7 41.0 Z',
  m:  'M 13.5 27 L 8 38.5 L 5.5 37 L 11 25.5 Z'
};

const SEG16_KEYS = ['a1','a2','b','c','d2','d1','e','f','g1','g2','h','i','j','k','l','m'];

function build16SegSvg(char, isDim = false) {
  const active = SEG16_MAP[char] || [];
  let paths = '';
  for(let i = 0; i < SEG16_KEYS.length; i++){
    const k = SEG16_KEYS[i];
    const on = !isDim && active.includes(k);
    paths += `<path class="seg ${on ? 'on' : 'off'}" d="${SEG16_PATHS[k]}"/>`;
  }
  return `<svg class="lcd-char-svg" viewBox="0 0 32 46">${paths}</svg>`;
}

function build16SegDot() {
  return `<svg class="lcd-dot-svg" viewBox="0 0 10 46"><circle class="seg on" cx="5" cy="40.5" r="3.4"/></svg>`;
}

/* ═══════════════════════════════════════════════════════════════
   DISPLAY RENDERER (Dual Engine: Nixie in Dark / 16-Seg LCD in Light)
   ═══════════════════════════════════════════════════════════════ */
function renderNixieValue(containerEl, value, intDigits = 3, fracDigits = 2, isOk = true) {
  if (!containerEl) return;
  const abs = Math.abs(value);
  const str = abs.toFixed(fracDigits);
  const parts = str.split('.');
  const intPart = parts[0].padStart(intDigits, '0');
  const fracPart = parts[1] || '';

  // 1. Dark Mode: Authentic Segmented Neon Gas-Discharge Nixie Tube (Panaplex/Numitron)
  let nixieHtml = '<div class="nixie-view">';
  for(let i = 0; i < intPart.length; i++){
    const isDim = (i < intPart.length - 1 && intPart[i] === '0' && !intPart.substring(0, i).match(/[1-9]/));
    nixieHtml += `<div class="nixie-tube">${build16SegSvg(intPart[i], isDim)}</div>`;
  }
  nixieHtml += `<div class="nixie-dot-tube">${build16SegDot()}</div>`;
  for(let i = 0; i < fracPart.length; i++){
    nixieHtml += `<div class="nixie-tube">${build16SegSvg(fracPart[i], false)}</div>`;
  }
  nixieHtml += `<div class="nixie-unit-group">
    <div class="nixie-tube nixie-unit-tube">${build16SegSvg('m')}</div>
    <div class="nixie-tube nixie-unit-tube">${build16SegSvg('s')}</div>
  </div>`;
  nixieHtml += `<div class="nixie-sep"></div>`;
  nixieHtml += `<div class="nixie-tube nixie-status-tube ${isOk ? 'status-ok' : 'status-dim'}" title="${isOk ? t('within_limit') : t('exceeds_limit')}">
    ${build16SegSvg('✓', !isOk)}
  </div>`;
  nixieHtml += `<div class="nixie-tube nixie-status-tube ${!isOk ? 'status-warn' : 'status-dim'}" title="${isOk ? t('within_limit') : t('exceeds_limit')}">
    ${build16SegSvg('✕', isOk)}
  </div>`;
  nixieHtml += '</div>';

  // 2. Light Mode: High-Legibility 16-Segment Cobalt/Navy Blue LCD Panel
  let lcdHtml = '<div class="lcd-view">';
  for(let i = 0; i < intPart.length; i++){
    const isDim = (i < intPart.length - 1 && intPart[i] === '0' && !intPart.substring(0, i).match(/[1-9]/));
    lcdHtml += `<div class="lcd-cell">${build16SegSvg(intPart[i], isDim)}</div>`;
  }
  lcdHtml += `<div class="lcd-dot-wrap">${build16SegDot()}</div>`;
  for(let i = 0; i < fracPart.length; i++){
    lcdHtml += `<div class="lcd-cell">${build16SegSvg(fracPart[i], false)}</div>`;
  }
  lcdHtml += `<div class="lcd-unit-group">
    <div class="lcd-cell lcd-unit-cell">${build16SegSvg('m')}</div>
    <div class="lcd-cell lcd-unit-cell">${build16SegSvg('s')}</div>
  </div>`;
  lcdHtml += `<div class="lcd-sep"></div>`;
  lcdHtml += `<div class="lcd-status-cell ${isOk ? 'status-ok' : ''}">
    ${build16SegSvg('✓', !isOk)}
  </div>`;
  lcdHtml += `<div class="lcd-status-cell ${!isOk ? 'status-warn' : ''}">
    ${build16SegSvg('✕', isOk)}
  </div>`;
  lcdHtml += '</div>';

  containerEl.innerHTML = nixieHtml + lcdHtml;
}

function renderMatrixChannelVal(containerEl, value, isOk = true) {
  if (!containerEl) return;
  if (!state.matrixNixie) {
    containerEl.classList.remove('nixie-mode');
    containerEl.textContent = `${fmt(value)} ms`;
    return;
  }

  containerEl.classList.add('nixie-mode');
  const abs = Math.abs(value);
  const str = abs.toFixed(2);
  const parts = str.split('.');
  const intPart = parts[0].padStart(2, '0');
  const fracPart = parts[1] || '00';

  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  let html = '';
  if (!isLight) {
    for (let i = 0; i < intPart.length; i++) {
      const isDim = (i === 0 && intPart[i] === '0');
      html += `<div class="nixie-tube">${build16SegSvg(intPart[i], isDim)}</div>`;
    }
    html += `<div class="nixie-dot-tube">${build16SegDot()}</div>`;
    for (let i = 0; i < fracPart.length; i++) {
      html += `<div class="nixie-tube">${build16SegSvg(fracPart[i], false)}</div>`;
    }
    html += `<div class="nixie-tube nixie-unit-tube">${build16SegSvg('m')}</div>`;
    html += `<div class="nixie-tube nixie-unit-tube">${build16SegSvg('s')}</div>`;
  } else {
    for (let i = 0; i < intPart.length; i++) {
      const isDim = (i === 0 && intPart[i] === '0');
      html += `<div class="lcd-cell">${build16SegSvg(intPart[i], isDim)}</div>`;
    }
    html += `<div class="lcd-dot-wrap">${build16SegDot()}</div>`;
    for (let i = 0; i < fracPart.length; i++) {
      html += `<div class="lcd-cell">${build16SegSvg(fracPart[i], false)}</div>`;
    }
    html += `<div class="lcd-cell lcd-unit-cell">${build16SegSvg('m')}</div>`;
    html += `<div class="lcd-cell lcd-unit-cell">${build16SegSvg('s')}</div>`;
  }
  containerEl.innerHTML = html;
}

document.querySelectorAll('.step-btn').forEach(btn => {
  const targetId = btn.dataset.target;
  const step = parseFloat(btn.dataset.step);
  const inputEl = document.getElementById(targetId);

  btn.addEventListener('click', () => {
    let current = parseFloat(inputEl.value) || 0;
    let min = inputEl.min !== '' ? parseFloat(inputEl.min) : -Infinity;
    let max = inputEl.max !== '' ? parseFloat(inputEl.max) : Infinity;
    let stepDecimals = 0;
    if(btn.dataset.step.includes('.')) stepDecimals = btn.dataset.step.split('.')[1].length;
    let nextVal = current + step;
    nextVal = Math.max(min, Math.min(max, nextVal));
    inputEl.value = nextVal.toFixed(stepDecimals);
    recalc();
  });
});

[hpfFreqEl, xoFreqEl, subLEl, subREl, backlineDistEl, topSubDistEl, micHeightEl, depthOffsetEl, topTuningEl, tempEl].forEach(el => {
  if(el){
    el.addEventListener('input', recalc);
    el.addEventListener('change', recalc);
  }
});

// Stage Backline Bypass Switch Handler
if (backlineSwitchEl) {
  backlineSwitchEl.addEventListener('click', () => {
    const isLeft = backlineSwitchEl.dataset.pos === 'left';
    backlineSwitchEl.dataset.pos = isLeft ? 'right' : 'left';
    state.enableBackline = !isLeft;

    if (backlineLabelOn) backlineLabelOn.classList.toggle('active', !isLeft);
    if (backlineLabelOff) backlineLabelOff.classList.toggle('active', isLeft);
    if (backlineStepperEl) backlineStepperEl.classList.toggle('bypassed', isLeft);
    if (backlineHintEl) {
      backlineHintEl.textContent = isLeft ? t('backline_hint_disabled') : t('backline_hint_active');
    }
    recalc();
  });
}

const btnTheme = document.getElementById('btnTheme');
let themeTransitionTimer = null;

function applyTheme(theme) {
  const isLight = theme === 'light';
  const lang = state.lang || 'en';
  if(isLight){
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', isLight ? '#eae6e2' : '#0a0a0c');
  }

  if(btnTheme){
    const icon = isLight ? '🌙' : '☀️';
    const text = isLight 
      ? (lang === 'ro' ? 'Întunecat' : 'Dark') 
      : (lang === 'ro' ? 'Luminos' : 'Light');
    btnTheme.innerHTML = `<span class="theme-icon" id="themeIcon">${icon}</span> <span class="theme-label" id="themeLabel">${text}</span>`;
    btnTheme.title = isLight
      ? (lang === 'ro' ? 'Comută la Tema Întunecată' : 'Switch to Dark Theme')
      : (lang === 'ro' ? 'Comută la Tema Luminoasă' : 'Switch to Light Theme');
  }
}

const initialTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
applyTheme(initialTheme);

if(btnTheme){
  btnTheme.addEventListener('click', () => {
    // Tactile button micro-animation
    btnTheme.classList.add('theme-toggled');
    setTimeout(() => btnTheme.classList.remove('theme-toggled'), 260);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    try { localStorage.setItem('delcalc_theme', next); } catch(e){}

    // Disable all element-level transition delays so all UI elements update synchronously in frame 1
    document.documentElement.classList.add('theme-instant');
    applyTheme(next);
    
    // Restore normal hover transitions on subsequent user interaction
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('theme-instant');
      });
    });
  });
}

document.getElementById('btnSyncSubs').addEventListener('click', () => {
  subREl.value = subLEl.value;
  recalc();
});

const btnReset = document.getElementById('btnReset');
let resetConfirmTimer = null;

btnReset.addEventListener('click', () => {
  if(!btnReset.classList.contains('confirming')){
    btnReset.classList.add('confirming');
    btnReset.innerHTML = t('btn_reset_confirm');
    if(resetConfirmTimer) clearTimeout(resetConfirmTimer);
    resetConfirmTimer = setTimeout(() => {
      btnReset.classList.remove('confirming');
      btnReset.innerHTML = t('btn_reset');
    }, 3500);
    return;
  }

  if(resetConfirmTimer) clearTimeout(resetConfirmTimer);
  btnReset.classList.remove('confirming');
  btnReset.innerHTML = t('btn_reset');

  state.hpfType = 'BW';
  state.hpfOrder = 2;
  state.xoType = 'LR';
  state.xoOrder = 4;
  state.enableBackline = true;
  state.calcMode = 'phase';

  hpfFreqEl.value = '40';
  xoFreqEl.value = '125';
  subLEl.value = '5.00';
  subREl.value = '5.00';
  if(backlineDistEl) backlineDistEl.value = '5.00';
  tempEl.value = '20';
  topSubDistEl.value = '1.20';
  if(micHeightEl) micHeightEl.value = '1.75';
  depthOffsetEl.value = '0.08';
  if(topTuningEl) topTuningEl.value = '50';

  document.getElementById('hpfSwitch').dataset.pos = 'top';
  document.getElementById('hpfLabelBW').classList.add('active');
  document.getElementById('hpfLabelLR').classList.remove('active');
  document.getElementById('xoSwitch').dataset.pos = 'bottom';
  document.getElementById('xoLabelBW').classList.remove('active');
  document.getElementById('xoLabelLR').classList.add('active');

  if(backlineSwitchEl) {
    backlineSwitchEl.dataset.pos = 'left';
    if(backlineLabelOn) backlineLabelOn.classList.add('active');
    if(backlineLabelOff) backlineLabelOff.classList.remove('active');
    if(backlineStepperEl) backlineStepperEl.classList.remove('bypassed');
    if(backlineHintEl) backlineHintEl.textContent = t('backline_hint_active');
  }

  if (btnEnginePhase && btnEngineGD) {
    btnEnginePhase.classList.add('active');
    btnEngineGD.classList.remove('active');
  }
  if (engineBadge) {
    engineBadge.textContent = t('engine_badge_phase');
  }
  try { localStorage.setItem('delcalc_calc_mode', 'phase'); } catch(e){}

  hpfKnob.updateDetents();
  xoKnobCtrl.updateDetents();
  recalc();
});

const btnLang = document.getElementById('btnLang');
if (btnLang) {
  btnLang.addEventListener('click', () => {
    const nextLang = state.lang === 'en' ? 'ro' : 'en';
    applyLanguage(nextLang);
  });
}

function fmt(v, d=2){ return (Math.abs(v) < 0.005 ? 0 : v).toFixed(d); }

function recalc(){
  const hType = state.hpfType, hOrd = state.hpfOrder;
  const xType = state.xoType, xOrd = state.xoOrder;
  const hF = Math.max(1, parseFloat(hpfFreqEl.value) || 0);
  const xF = Math.max(1, parseFloat(xoFreqEl.value) || 0);

  if(hF >= xF) crossoverAlertEl.style.display = 'block';
  else crossoverAlertEl.style.display = 'none';

  const ambientTemp = parseFloat(tempEl.value) || 20;
  const c = speedOfSound(ambientTemp);
  speedHintEl.textContent = `${t('speed_sound_prefix')} ${c.toFixed(1)} m/s`;

  const dL = Math.max(0.1, parseFloat(subLEl.value) || 0.1);
  const dR = Math.max(0.1, parseFloat(subREl.value) || 0.1);
  const topSubDist = Math.max(0, parseFloat(topSubDistEl.value) || 0);
  const hMic = Math.max(0, parseFloat(micHeightEl ? micHeightEl.value : '1.75') || 1.75);
  const depthOffset = parseFloat(depthOffsetEl.value) || 0; // Positive (+) = Top driver is forward/closer to audience than sub voice coil
  const backlineDist = Math.max(0, parseFloat(backlineDistEl ? backlineDistEl.value : '5.00') || 0);

  // 1. STAGE BACKLINE TO PA FRONT INPUT DELAY CALCULATION
  const backlineDelayMs = state.enableBackline ? (backlineDist / c) * 1000 : 0;

  const tL = (dL / c) * 1000;
  const tR = (dR / c) * 1000;
  const diff1 = tL - tR;
  const step1ms = Math.abs(diff1);
  const closerSideDisplay = diff1 > 0.005 ? (state.lang === 'ro' ? 'SUB DREAPTA' : 'SUB R') : (diff1 < -0.005 ? (state.lang === 'ro' ? 'SUB STÂNGA' : 'SUB L') : t('matched'));
  const closerSide = diff1 > 0.005 ? 'SUB R' : (diff1 < -0.005 ? 'SUB L' : 'Matched');
  const s1ok = step1ms <= 10.0;

  renderNixieValue(document.getElementById('nixieStep1'), step1ms, 3, 2, s1ok);

  document.getElementById('step1Desc').textContent = step1ms < 0.005
    ? t('step1_desc_matched')
    : t('step1_desc_delay', { ms: fmt(step1ms), side: closerSideDisplay });

  document.getElementById('step1Readout').className = 'readout' + (s1ok ? '' : ' warn');
  document.getElementById('step1Breakdown').innerHTML = `
    <div><span>${t('step1_bd_subL')} (${dL.toFixed(1)}m)</span><span class="val">${fmt(tL)} ms</span></div>
    <div><span>${t('step1_bd_subR')} (${dR.toFixed(1)}m)</span><span class="val">${fmt(tR)} ms</span></div>
    <div><span>${t('step1_bd_diff')}</span><span class="val">${fmt(step1ms)} ms</span></div>`;

  // 2. ELECTRO-ACOUSTIC PHYSICS & CALCULATION ENGINE (Mode A: Phase Angle vs Mode B: Group Delay)
  const topFb = Math.max(10, parseFloat(topTuningEl ? topTuningEl.value : '50') || 50);
  let dspAcousticDelayMs = 0;
  let breakdownDsp = '';
  let breakdownSubPhase = '';
  let breakdownTopPhase = '';
  let qRefLeadVal = '';

  if (state.calcMode === 'phase') {
    // Mode A: Exact Phase Angle Alignment (Smaart-Grade · Default)
    const subHpfPhaseDeg = filterPhaseShiftDeg(hType, hOrd, hF, xF);
    const subAcousticPhaseDeg = enclosurePhaseDeg(38, xF);
    const topAcousticPhaseDeg = enclosurePhaseDeg(topFb, xF);
    const driverPhaseDiffDeg = subAcousticPhaseDeg - topAcousticPhaseDeg;
    const totalSubPhaseDeg = subHpfPhaseDeg + driverPhaseDiffDeg;

    const tPeriod = 1000 / xF;
    dspAcousticDelayMs = (totalSubPhaseDeg / 360) * tPeriod;

    const hpfDelayMs = (subHpfPhaseDeg / 360) * tPeriod;
    const subPhaseMs = (subAcousticPhaseDeg / 360) * tPeriod;
    const topPhaseMs = (topAcousticPhaseDeg / 360) * tPeriod;

    breakdownDsp = `<div><span>${t('step2_bd_dsp_phase', { freq: xF, deg: subHpfPhaseDeg.toFixed(0) })}</span><span class="val">+${fmt(hpfDelayMs)} ms</span></div>`;
    breakdownSubPhase = `<div><span>${t('step2_bd_sub_phase_ang', { deg: subAcousticPhaseDeg.toFixed(0) })}</span><span class="val">+${fmt(subPhaseMs)} ms</span></div>`;
    breakdownTopPhase = `<div><span>${t('step2_bd_top_phase_ang', { freq: topFb, deg: topAcousticPhaseDeg.toFixed(0) })}</span><span class="val">-${fmt(topPhaseMs)} ms</span></div>`;
    qRefLeadVal = `${totalSubPhaseDeg.toFixed(0)}° (${fmt(dspAcousticDelayMs)} ms)`;
  } else {
    // Mode B: Group Delay Envelope Slope
    const subHpfGD = filterGD(hType, hOrd, hF, xF) * 1000;
    const topAcousticGD = butterworthGD(4, topFb, xF) * 1000;
    const subAcousticGD = butterworthGD(4, 38, xF) * 1000;
    const driverPhaseDiff = subAcousticGD - topAcousticGD;
    dspAcousticDelayMs = subHpfGD + driverPhaseDiff;

    breakdownDsp = `<div><span>${t('step2_bd_dsp', { freq: xF })}</span><span class="val">+${fmt(subHpfGD)} ms</span></div>`;
    breakdownSubPhase = `<div><span>${t('step2_bd_sub_phase')}</span><span class="val">+${fmt(subAcousticGD)} ms</span></div>`;
    breakdownTopPhase = `<div><span>${t('step2_bd_top_phase', { freq: topFb })}</span><span class="val">-${fmt(topAcousticGD)} ms</span></div>`;
    qRefLeadVal = `${fmt(dspAcousticDelayMs)} ms`;
  }

  // 3. 3D GEOMETRY & PROPAGATION DELAYS (Factoring Mic Height H_mic & Positive Forward Depth Offset):
  // D_sub = slant line of sight to ground sub: X = sqrt(max(0.01, D_sub^2 - H_mic^2))
  // D_top = sqrt(X^2 + (V - H_mic)^2) - depthOffset
  const groundDistSqL = Math.max(0.01, dL * dL - hMic * hMic);
  const groundDistSqR = Math.max(0.01, dR * dR - hMic * hMic);
  const topPathL = Math.sqrt(groundDistSqL + Math.pow(topSubDist - hMic, 2)) - depthOffset;
  const topPathR = Math.sqrt(groundDistSqR + Math.pow(topSubDist - hMic, 2)) - depthOffset;
  const propDiffL = ((topPathL - dL) / c) * 1000;
  const propDiffR = ((topPathR - dR) / c) * 1000;
  const propDiff = (propDiffL + propDiffR) / 2;

  const step2total = dspAcousticDelayMs - propDiff;
  const step2abs = Math.abs(step2total);
  const targetSideKey = step2total >= 0 ? 'top_pair' : 'sub_pair';
  const targetSide = t(targetSideKey);
  const s2ok = step2abs <= 10.0;

  const step2total_L = dspAcousticDelayMs - propDiffL;
  const step2abs_L = Math.abs(step2total_L);
  const targetSideKey_L = step2total_L >= 0 ? 'top_pair' : 'sub_pair';

  const step2total_R = dspAcousticDelayMs - propDiffR;
  const step2abs_R = Math.abs(step2total_R);
  const targetSideKey_R = step2total_R >= 0 ? 'top_pair' : 'sub_pair';

  renderNixieValue(document.getElementById('nixieStep2'), step2abs, 3, 2, s2ok);

  document.getElementById('step2Desc').textContent =
    t('step2_desc', { ms: fmt(step2abs), target: targetSide, freq: xF });

  document.getElementById('step2Readout').className = 'readout' + (s2ok ? '' : ' warn');

  document.getElementById('step2Breakdown').innerHTML = `
    ${breakdownDsp}
    ${breakdownSubPhase}
    ${breakdownTopPhase}
    <div><span>${t('step2_bd_geom')}</span><span class="val">-${fmt(propDiff)} ms</span></div>
    <div style="border-top:1px dashed var(--border); margin-top:4px; padding-top:4px;"><span>${t('step2_bd_total')}</span><span class="val">${fmt(step2abs)} ms → ${targetSide}</span></div>`;

  const tPeriod = 1000 / xF;
  const tHalf = tPeriod / 2;
  const halfDistM = (c * (tHalf / 1000));
  const xoPhaseShift = getCrossoverFilterPhaseShift(xType, xOrd);
  const isFilter180 = (xoPhaseShift === 180);
  const isFilter270 = (xoPhaseShift === 270);
  const isFilterInPhase = (xoPhaseShift === 0);

  // BW18 270° (180° + 90°) fine delay offset = T/4 (bridges 90° remaining shift)
  const fineShiftMs = isFilter270 ? (tPeriod / 4) : 0;

  // Global Headline 180° Inverted Delay
  let invDelayMs = 0;
  let invTargetSideKey = 'top_pair';
  if (step2total >= 0) {
    const diffInv = step2total - tHalf + fineShiftMs;
    if (diffInv >= 0) {
      invDelayMs = diffInv;
      invTargetSideKey = 'top_pair';
    } else {
      invDelayMs = Math.abs(diffInv);
      invTargetSideKey = 'sub_pair';
    }
  } else {
    const diffInv = Math.abs(step2total) - tHalf + fineShiftMs;
    if (diffInv >= 0) {
      invDelayMs = diffInv;
      invTargetSideKey = 'sub_pair';
    } else {
      invDelayMs = Math.abs(diffInv);
      invTargetSideKey = 'top_pair';
    }
  }
  const invTargetSide = t(invTargetSideKey);
  const s2InvOk = invDelayMs <= 10.0;

  // Independent Left Stack Inverted Delay
  let invDelayMs_L = 0;
  let invTargetSide_L = 'top_pair';
  if (step2total_L >= 0) {
    const diffInvL = step2total_L - tHalf + fineShiftMs;
    if (diffInvL >= 0) {
      invDelayMs_L = diffInvL;
      invTargetSide_L = 'top_pair';
    } else {
      invDelayMs_L = Math.abs(diffInvL);
      invTargetSide_L = 'sub_pair';
    }
  } else {
    const diffInvL = Math.abs(step2total_L) - tHalf + fineShiftMs;
    if (diffInvL >= 0) {
      invDelayMs_L = diffInvL;
      invTargetSide_L = 'sub_pair';
    } else {
      invDelayMs_L = Math.abs(diffInvL);
      invTargetSide_L = 'top_pair';
    }
  }

  // Independent Right Stack Inverted Delay
  let invDelayMs_R = 0;
  let invTargetSide_R = 'top_pair';
  if (step2total_R >= 0) {
    const diffInvR = step2total_R - tHalf + fineShiftMs;
    if (diffInvR >= 0) {
      invDelayMs_R = diffInvR;
      invTargetSide_R = 'top_pair';
    } else {
      invDelayMs_R = Math.abs(diffInvR);
      invTargetSide_R = 'sub_pair';
    }
  } else {
    const diffInvR = Math.abs(step2total_R) - tHalf + fineShiftMs;
    if (diffInvR >= 0) {
      invDelayMs_R = diffInvR;
      invTargetSide_R = 'sub_pair';
    } else {
      invDelayMs_R = Math.abs(diffInvR);
      invTargetSide_R = 'top_pair';
    }
  }

  // 4. CROSSOVER-TOPOLOGY PHASE RECOMMENDATION ENGINE:
  let recType = 'ok';
  let recBadgeText = '';
  let recShortText = '';

  const normBox = document.getElementById('phaseBoxNorm');
  const invBox = document.getElementById('phaseBoxInv');
  normBox.className = 'phase-option-box';
  invBox.className = 'phase-option-box';

  if (isFilter180) {
    recType = 'rec';
    recBadgeText = t('rec_badge_180_filter');
    recShortText = t('rec_short_180');
    invBox.classList.add('recommended');
  } else if (isFilter270) {
    recType = 'rec';
    recBadgeText = t('rec_badge_bw18');
    recShortText = t('rec_short_180_fine');
    invBox.classList.add('recommended');
  } else if (isFilterInPhase) {
    if (s2ok) {
      recType = 'ok';
      recBadgeText = t('rec_badge_opt');
      recShortText = t('rec_short_opt');
      normBox.classList.add('recommended');
    } else if (!s2ok && s2InvOk) {
      recType = 'alt';
      recBadgeText = t('rec_badge_workaround_180');
      recShortText = t('rec_short_workaround');
      invBox.classList.add('recommended');
    } else {
      recType = 'warn';
      recBadgeText = t('rec_badge_warn');
      recShortText = t('rec_short_warn');
    }
  } else {
    if (s2ok) {
      recType = 'ok';
      recBadgeText = t('rec_badge_opt');
      recShortText = t('rec_short_opt');
      normBox.classList.add('recommended');
    } else {
      recType = 'warn';
      recBadgeText = t('rec_badge_warn');
      recShortText = t('rec_short_warn');
    }
  }

  document.getElementById('phaseBadgeContainer').innerHTML =
    `<span class="phase-badge ${recType}">${recBadgeText}</span>`;

  const normValEl = document.getElementById('phaseNormVal');
  const normStatusEl = document.getElementById('phaseNormStatus');
  if (s2ok) {
    normValEl.innerHTML = `${fmt(step2abs)} <span class="unit">ms</span>`;
    normValEl.classList.remove('exceeded');
    normStatusEl.innerHTML = '';
  } else {
    normValEl.innerHTML = `<span class="val-strikethrough">${fmt(step2abs)}</span> <span class="unit">ms</span>`;
    normValEl.classList.add('exceeded');
    normStatusEl.innerHTML = `<span class="phase-status-pill fail">${t('exceeds_limit')}</span>`;
  }
  document.getElementById('phaseNormTarget').textContent = `${t('target_prefix')} ${targetSide}`;

  const invValEl = document.getElementById('phaseInvVal');
  const invStatusEl = document.getElementById('phaseInvStatus');
  if (s2InvOk) {
    invValEl.innerHTML = `${fmt(invDelayMs)} <span class="unit">ms</span>`;
    invValEl.classList.remove('exceeded');
    invStatusEl.innerHTML = '';
  } else {
    invValEl.innerHTML = `<span class="val-strikethrough">${fmt(invDelayMs)}</span> <span class="unit">ms</span>`;
    invValEl.classList.add('exceeded');
    invStatusEl.innerHTML = `<span class="phase-status-pill fail">${t('exceeds_limit')}</span>`;
  }
  document.getElementById('phaseInvTarget').textContent = `${t('target_prefix')} ${invTargetSide}`;

  // 5. ACTIONABLE STEPS & NULL TEST FIELD CALIBRATION GUIDE:
  let actionHtml = '';
  if (state.lang === 'ro') {
    if (isFilter180) {
      actionHtml = `
        <ol>
          <li>Deschideți <strong>Meniul Crossover din dbx / DSP</strong> &rarr; canalul <span class="phase-code">SUBWOOFER OUTPUT</span>.</li>
          <li>Setați <strong>Polarity</strong> pe <span class="phase-code">INVERTED (180°)</span> — obligatoriu pentru filtrele de ordinul 2 (${state.xoType}12) pentru a compensa rotația de 180° (90° lag sub + 90° lead top).</li>
          <li>Setați <strong>Output Delay</strong> pe <span class="phase-code">${invTargetSide}</span> la exact <strong style="color:var(--accent);">${fmt(invDelayMs)} ms</strong>.</li>
          <li><em>Rezultat:</em> Undele acustice se adună perfect în fază (+6 dB) la frecvența de crossover (${xF}Hz).</li>
        </ol>`;
    } else if (isFilter270) {
      actionHtml = `
        <ol>
          <li>Deschideți <strong>Meniul Crossover din dbx / DSP</strong> &rarr; canalul <span class="phase-code">SUBWOOFER OUTPUT</span>.</li>
          <li>Setați <strong>Polarity</strong> pe <span class="phase-code">INVERTED (180°)</span> pentru a acoperi prima jumătate a defazajului de 270° introdus de filtrul Butterworth 18 dB/oct.</li>
          <li>Setați <strong>Output Delay</strong> pe <span class="phase-code">${invTargetSide}</span> la <strong style="color:var(--accent);">${fmt(invDelayMs)} ms</strong> pentru a acoperi restul de 90° (&lambda;/4).</li>
          <li><em>Rezultat:</em> Aliniere de fază coerentă fără smearing temporal excesiv.</li>
        </ol>`;
    } else if (recType === 'alt' || (!s2ok && s2InvOk)) {
      actionHtml = `
        <div style="color:var(--amber); font-weight:700; margin-bottom:6px;">⚠️ Compromis Limită DSP (Plafon 10ms depășit pe 0° Normal):</div>
        <ol>
          <li>Setați <strong>Polarity</strong> pe <span class="phase-code">INVERTED (180°)</span> pentru a cupla pe ciclul de undă adiacent (${fmt(tHalf,1)}ms @ ${xF}Hz).</li>
          <li>Setați <strong>Output Delay</strong> pe <span class="phase-code">${invTargetSide}</span> la <strong style="color:var(--accent);">${fmt(invDelayMs)} ms</strong>.</li>
          <li><em>Notă Electro-Acustică:</em> Cuplarea pe ciclul adiacent economisește delay DSP, însă poate introduce un ușor decalaj tranzitoriu pe atacul tobei mari. Soluția optimă recomandată este repoziționarea fizică a boxelor.</li>
        </ol>`;
    } else if (recType === 'warn') {
      const minPhysicalM = (Math.min(step2abs, invDelayMs) - 10.0) * (c / 1000);
      actionHtml = `
        <div style="color:var(--red); font-weight:700; margin-bottom:6px;">⚠️ Limita de Output Delay DSP a fost depășită pe ambele polarități:</div>
        <ol>
          <li>Mutați fizic boxele <strong>Top în spate</strong> mai departe de public cu cel puțin <strong style="color:var(--accent);">${fmt(minPhysicalM, 2)} m</strong>, SAU</li>
          <li>Mutați fizic boxele <strong>Subwoofer în față</strong> către public cu cel puțin <strong style="color:var(--accent);">${fmt(minPhysicalM, 2)} m</strong>.</li>
          <li>Re-măsurați distanța și recalculați delay-ul după repoziționarea boxelor.</li>
        </ol>`;
    } else {
      actionHtml = `
        <ol>
          <li>Păstrați <strong>Polarity în Crossover dbx / DSP</strong> pe <span class="phase-code">NORMAL (0°)</span> — filtrele ${state.xoType}${state.xoOrder*6} sunt matematic în fază (0°).</li>
          <li>Setați <strong>Output Delay</strong> pe <span class="phase-code">${targetSide}</span> la <strong style="color:var(--accent);">${fmt(step2abs)} ms</strong> (compensează defazajul filtrului Sub HPF de ${hF}Hz și decalajul 3D geometric).</li>
          <li><strong>Procedură Calibrare pe Teren (Testul de Nul):</strong>
            <ul style="margin:4px 0 0 16px; font-size:0.92em; color:var(--dim);">
              <li>Inversați temporar polaritatea sub-ului la <span class="phase-code">180°</span> și redați un ton sinusoidal pur la ${xF}Hz.</li>
              <li>Ajustați fin delay-ul pe topuri până obțineți <em>anularea maximă a sunetului (liniște/nul acustic)</em>.</li>
              <li>Comutați polaritatea înapoi pe <span class="phase-code">NORMAL (0°)</span>. Sistemul este acum perfect blocat în fază.</li>
            </ul>
          </li>
        </ol>`;
    }
  } else {
    if (isFilter180) {
      actionHtml = `
        <ol>
          <li>Open your <strong>dbx / DSP Crossover Menu</strong> &rarr; <span class="phase-code">SUBWOOFER OUTPUT</span> channel.</li>
          <li>Set <strong>Polarity</strong> to <span class="phase-code">INVERTED (180°)</span> — mandatory for 2nd-order (${state.xoType}12) filters to correct the 180° phase shift (90° LP lag + 90° HP lead).</li>
          <li>Set <strong>Output Delay</strong> on the <span class="phase-code">${invTargetSide}</span> to exactly <strong style="color:var(--accent);">${fmt(invDelayMs)} ms</strong>.</li>
          <li><em>Result:</em> Acoustic waveforms sum constructively (+6 dB) in-phase at the crossover frequency (${xF}Hz).</li>
        </ol>`;
    } else if (isFilter270) {
      actionHtml = `
        <ol>
          <li>Open your <strong>dbx / DSP Crossover Menu</strong> &rarr; <span class="phase-code">SUBWOOFER OUTPUT</span> channel.</li>
          <li>Set <strong>Polarity</strong> to <span class="phase-code">INVERTED (180°)</span> to bridge the first 180° of the 270° phase shift introduced by 3rd-order Butterworth filters.</li>
          <li>Set <strong>Output Delay</strong> on the <span class="phase-code">${invTargetSide}</span> to <strong style="color:var(--accent);">${fmt(invDelayMs)} ms</strong> to bridge the remaining 90° (&lambda;/4).</li>
          <li><em>Result:</em> Coherent phase alignment across the crossover summation band without cycle smearing.</li>
        </ol>`;
    } else if (recType === 'alt' || (!s2ok && s2InvOk)) {
      actionHtml = `
        <div style="color:var(--amber); font-weight:700; margin-bottom:6px;">⚠️ DSP Delay Limit Workaround (0° Normal exceeds 10ms ceiling):</div>
        <ol>
          <li>Set <strong>Polarity</strong> to <span class="phase-code">INVERTED (180°)</span> to couple on the adjacent acoustic wave cycle (${fmt(tHalf,1)}ms @ ${xF}Hz).</li>
          <li>Set <strong>Output Delay</strong> on the <span class="phase-code">${invTargetSide}</span> to <strong style="color:var(--accent);">${fmt(invDelayMs)} ms</strong>.</li>
          <li><em>Electro-Acoustic Note:</em> Adjacent cycle coupling saves DSP delay, but introduces slight transient smearing on kick drum impulses. The recommended permanent fix is physical cabinet repositioning.</li>
        </ol>`;
    } else if (recType === 'warn') {
      const minPhysicalM = (Math.min(step2abs, invDelayMs) - 10.0) * (c / 1000);
      actionHtml = `
        <div style="color:var(--red); font-weight:700; margin-bottom:6px;">⚠️ DSP Output Delay Limit Exceeded on Both Polarities:</div>
        <ol>
          <li>Physically move your <strong>Top cabinets backwards</strong> away from audience by at least <strong style="color:var(--accent);">${fmt(minPhysicalM, 2)} m</strong>, OR</li>
          <li>Physically move your <strong>Subwoofer cabinets forward</strong> towards audience by at least <strong style="color:var(--accent);">${fmt(minPhysicalM, 2)} m</strong>.</li>
          <li>Re-measure distance and re-calculate delay once cabinets are repositioned.</li>
        </ol>`;
    } else {
      actionHtml = `
        <ol>
          <li>Keep <strong>dbx / DSP Crossover Polarity</strong> on <span class="phase-code">NORMAL (0°)</span> — ${state.xoType}${state.xoOrder*6} filters are mathematically in-phase (0°).</li>
          <li>Set <strong>Output Delay</strong> on the <span class="phase-code">${targetSide}</span> to <strong style="color:var(--accent);">${fmt(step2abs)} ms</strong> (compensates ${hF}Hz sub HPF phase delay and 3D geometric path difference).</li>
          <li><strong>Field Micro-Delay Calibration (Sine Wave Null Test):</strong>
            <ul style="margin:4px 0 0 16px; font-size:0.92em; color:var(--dim);">
              <li>Temporarily set Sub polarity to <span class="phase-code">180° INVERTED</span> and play a pure ${xF}Hz sine wave.</li>
              <li>Fine-tune Top delay on your DSP until you find the <em>deepest acoustic cancellation null (maximum silence)</em>.</li>
              <li>Switch Sub polarity back to <span class="phase-code">NORMAL (0°)</span>. The system is now locked in perfect phase alignment.</li>
            </ul>
          </li>
        </ol>`;
    }
  }
  document.getElementById('phaseActionSteps').innerHTML = actionHtml;

  const discBox = document.getElementById('phaseDisclaimerBox');
  const discTitle = document.getElementById('phaseDisclaimerTitle');
  const discDesc = document.getElementById('phaseDisclaimerDesc');
  const discLink = document.getElementById('phaseDisclaimerLink');

  if (discBox && discTitle && discDesc) {
    if (isFilter180 || isFilter270) {
      discBox.style.display = 'block';
      discTitle.textContent = t('phase_disclaimer_title_filter');
      discDesc.innerHTML = t('phase_disclaimer_desc_filter', {
        xoType: state.xoType,
        xoOrder: state.xoOrder * 6,
        freq: xF,
        normDelay: fmt(step2abs),
        invDelay: fmt(invDelayMs)
      });
      if (discLink) discLink.textContent = t('phase_disclaimer_manual_link');
    } else {
      discBox.style.display = 'none';
    }
  }

  document.getElementById('phaseBreakdown').innerHTML = `
    <div><span>${t('phase_bd_freq')}</span><span class="val">${xF} Hz (${t('phase_bd_period')} ${fmt(tPeriod,1)} ms)</span></div>
    <div><span>${t('phase_bd_half_wave')}</span><span class="val">&plusmn;${fmt(tHalf,2)} ms (&asymp; ${fmt(halfDistM,2)}m)</span></div>
    <div><span>${t('phase_bd_norm_req')}</span><span class="val">${fmt(step2abs)} ms &rarr; ${targetSide}</span></div>
    <div><span>${t('phase_bd_inv_req')}</span><span class="val">${fmt(invDelayMs)} ms &rarr; ${invTargetSide}</span></div>`;

  // Update Landscape / Fullscreen SVG Diagram Elements
  const flowBacklineBadgeLand = document.getElementById('flowBacklineBadgeLand');
  const flowBacklineZoneLand = document.getElementById('flowBacklineZoneLand');
  const flowBacklineValLand = document.getElementById('flowBacklineValLand');
  const flowBacklineDistLand = document.getElementById('flowBacklineDistLand');

  if (flowBacklineBadgeLand && flowBacklineValLand) {
    if (state.enableBackline) {
      flowBacklineBadgeLand.classList.remove('bypassed');
      if (flowBacklineZoneLand) flowBacklineZoneLand.classList.remove('bypassed');
      flowBacklineValLand.textContent = `${fmt(backlineDelayMs, 1)} ms`;
      if (flowBacklineDistLand) flowBacklineDistLand.textContent = `d: ${backlineDist.toFixed(2)} m`;
    } else {
      flowBacklineBadgeLand.classList.add('bypassed');
      if (flowBacklineZoneLand) flowBacklineZoneLand.classList.add('bypassed');
      flowBacklineValLand.textContent = 'BYPASS (0.0 ms)';
      if (flowBacklineDistLand) flowBacklineDistLand.textContent = `d: 0.00 m [OFF]`;
    }
  }

  // Update Mobile SVG Diagram Elements
  const flowBacklineBadgeMob = document.getElementById('flowBacklineBadgeMob');
  const flowBacklineZoneMob = document.getElementById('flowBacklineZoneMob');
  const flowBacklineValMob = document.getElementById('flowBacklineValMob');

  if (flowBacklineBadgeMob && flowBacklineValMob) {
    if (state.enableBackline) {
      flowBacklineBadgeMob.classList.remove('bypassed');
      if (flowBacklineZoneMob) flowBacklineZoneMob.classList.remove('bypassed');
      flowBacklineValMob.textContent = `INPUT: ${fmt(backlineDelayMs, 1)} ms`;
    } else {
      flowBacklineBadgeMob.classList.add('bypassed');
      if (flowBacklineZoneMob) flowBacklineZoneMob.classList.add('bypassed');
      flowBacklineValMob.textContent = 'INPUT: BYPASS (0.0 ms)';
    }
  }

  // Depth Offset visual string
  const depthValStr = `⤹ ${depthOffset >= 0 ? '+' : ''}${depthOffset.toFixed(2)} m`;
  const flowDepthLLand = document.getElementById('flowDepthLLand');
  if (flowDepthLLand) flowDepthLLand.textContent = depthValStr;
  const flowDepthRLand = document.getElementById('flowDepthRLand');
  if (flowDepthRLand) flowDepthRLand.textContent = depthValStr;
  const flowDepthLMob = document.getElementById('flowDepthLMob');
  if (flowDepthLMob) flowDepthLMob.textContent = depthValStr;
  const flowDepthRMob = document.getElementById('flowDepthRMob');
  if (flowDepthRMob) flowDepthRMob.textContent = depthValStr;

  // Directional arrow logic (shows ONLY on sub needing delay, otherwise hidden)
  const subLNeedsDelay = diff1 < -0.005; // Left sub closer -> delay Sub L
  const subRNeedsDelay = diff1 > 0.005;  // Right sub closer -> delay Sub R
  const isSubMatched = !subLNeedsDelay && !subRNeedsDelay;

  const arrowLeftLand = document.getElementById('flowArrowLeftLand');
  const arrowRightLand = document.getElementById('flowArrowRightLand');
  const arrowLeftMob = document.getElementById('flowArrowLeftMob');
  const arrowRightMob = document.getElementById('flowArrowRightMob');

  if (arrowLeftLand) arrowLeftLand.classList.toggle('flow-arrow-hidden', !subLNeedsDelay);
  if (arrowRightLand) arrowRightLand.classList.toggle('flow-arrow-hidden', !subRNeedsDelay);
  if (arrowLeftMob) arrowLeftMob.classList.toggle('flow-arrow-hidden', !subLNeedsDelay);
  if (arrowRightMob) arrowRightMob.classList.toggle('flow-arrow-hidden', !subRNeedsDelay);

  // Center Delay text (No redundant inter-sub distance)
  const flowSubDelayValLand = document.getElementById('flowSubDelayValLand');
  if (flowSubDelayValLand) {
    flowSubDelayValLand.textContent = isSubMatched 
      ? (state.lang === 'ro' ? '0.0 ms (ECHIDISTANT)' : '0.0 ms (MATCHED)')
      : `DELAY: ${fmt(step1ms, 1)} ms`;
  }
  const flowSubDelayValMob = document.getElementById('flowSubDelayValMob');
  if (flowSubDelayValMob) {
    flowSubDelayValMob.textContent = isSubMatched 
      ? '0.0 ms'
      : `DELAY: ${fmt(step1ms, 1)} ms`;
  }

  // Floating Acoustic Ray Labels (A & B)
  const flowRayL = document.getElementById('flowRayL');
  if (flowRayL) flowRayL.textContent = `A · dL: ${dL.toFixed(2)} m (${fmt(tL, 1)} ms)`;
  const flowRayR = document.getElementById('flowRayR');
  if (flowRayR) flowRayR.textContent = `B · dR: ${dR.toFixed(2)} m (${fmt(tR, 1)} ms)`;

  const mobRayL = document.getElementById('flowRayL_mob');
  if (mobRayL) mobRayL.textContent = `A: ${dL.toFixed(2)}m (${fmt(tL, 1)}ms)`;
  const mobRayR = document.getElementById('flowRayR_mob');
  if (mobRayR) mobRayR.textContent = `B: ${dR.toFixed(2)}m (${fmt(tR, 1)}ms)`;

  // Quick Reference Card updates
  document.getElementById('qSpeed').textContent = `${c.toFixed(1)} m/s`;
  const qInputDelay = document.getElementById('qInputDelay');
  if (qInputDelay) {
    qInputDelay.textContent = state.enableBackline ? `${fmt(backlineDelayMs)} ms` : (state.lang === 'ro' ? 'Dezactivat (0.0 ms)' : 'Bypassed (0.0 ms)');
  }
  document.getElementById('qStep1').textContent = step1ms < 0.005 ? t('none_matched') : `${fmt(step1ms)} ms → ${closerSide}`;
  document.getElementById('qStep2').textContent = `${fmt(step2abs)} ms → ${targetSide}`;
  document.getElementById('qStep2Inv').textContent = `${fmt(invDelayMs)} ms → ${invTargetSide}`;
  document.getElementById('qPolarityRec').textContent = recShortText;
  
  const qGDLabel = document.querySelector('[data-i18n="qref_gd"]');
  if (qGDLabel) {
    qGDLabel.textContent = state.calcMode === 'phase' ? t('qref_phase') : t('qref_gd');
  }
  document.getElementById('qGD').textContent = qRefLeadVal;

  // 6. DIRECT VALUES ROUTING & STEREO PA STACK COUPLING (Independent Per-Channel Inversion!):
  const subL_step1 = diff1 < -0.005 ? step1ms : 0;
  const subR_step1 = diff1 > 0.005 ? step1ms : 0;

  // 0° Normal per-channel stack coupling:
  const normSubL = (targetSideKey_L === 'top_pair') ? subL_step1 : (subL_step1 + step2abs_L);
  const normSubR = (targetSideKey_R === 'top_pair') ? subR_step1 : (subR_step1 + step2abs_R);
  const normTopL = (targetSideKey_L === 'top_pair') ? (subL_step1 + step2abs_L) : subL_step1;
  const normTopR = (targetSideKey_R === 'top_pair') ? (subR_step1 + step2abs_R) : subR_step1;
  const normExceeds10 = (normTopL > 10.0) || (normTopR > 10.0) || (normSubL > 10.0) || (normSubR > 10.0);

  // 180° Inverted per-channel stack coupling (independent per-side diffInv!):
  const invSubL = (invTargetSide_L === 'top_pair') ? subL_step1 : (subL_step1 + invDelayMs_L);
  const invSubR = (invTargetSide_R === 'top_pair') ? subR_step1 : (subR_step1 + invDelayMs_R);
  const invTopL = (invTargetSide_L === 'top_pair') ? (subL_step1 + invDelayMs_L) : subL_step1;
  const invTopR = (invTargetSide_R === 'top_pair') ? (subR_step1 + invDelayMs_R) : subR_step1;
  const invWithin10 = (invTopL <= 10.0) && (invTopR <= 10.0) && (invSubL <= 10.0) && (invSubR <= 10.0);

  let dirSubL = 0, dirSubR = 0, dirTopL = 0, dirTopR = 0;
  let dirNoteText = '';
  let dirBadgeText = t('badge_0_normal');
  let dirBadgeClass = 'direct-badge';

  const shouldInvert = isFilter180 || isFilter270 || (state.allowPolarityInvert && (recType === 'alt' || isFilter180 || isFilter270));

  if (shouldInvert) {
    dirSubL = invSubL; dirSubR = invSubR; dirTopL = invTopL; dirTopR = invTopR;
    dirBadgeText = t('badge_180_inverted');
    dirBadgeClass = 'direct-badge inverted';
    if (isFilter180) dirNoteText = t('dir_note_180_filter');
    else if (isFilter270) dirNoteText = t('dir_note_bw18_applied');
    else dirNoteText = t('dir_note_180_workaround');
  } else {
    if (normExceeds10 && invWithin10 && state.allowPolarityInvert) {
      dirSubL = invSubL; dirSubR = invSubR; dirTopL = invTopL; dirTopR = invTopR;
      dirBadgeText = t('badge_auto_180');
      dirBadgeClass = 'direct-badge warn';
      dirNoteText = t('dir_note_auto_180');
    } else if (normExceeds10) {
      dirSubL = normSubL; dirSubR = normSubR; dirTopL = normTopL; dirTopR = normTopR;
      dirBadgeText = t('badge_limit_exceeded');
      dirBadgeClass = 'direct-badge warn';
      dirNoteText = t('dir_note_both_exceed');
    } else {
      dirSubL = normSubL; dirSubR = normSubR; dirTopL = normTopL; dirTopR = normTopR;
      dirBadgeText = t('badge_0_normal');
      dirBadgeClass = 'direct-badge';
      dirNoteText = isFilterInPhase ? t('dir_note_0_inphase') : t('dir_note_0_strict');
    }
  }

  renderMatrixChannelVal(document.getElementById('dirSubL'), dirSubL, dirSubL <= 10.0);
  renderMatrixChannelVal(document.getElementById('dirSubR'), dirSubR, dirSubR <= 10.0);
  renderMatrixChannelVal(document.getElementById('dirTopL'), dirTopL, dirTopL <= 10.0);
  renderMatrixChannelVal(document.getElementById('dirTopR'), dirTopR, dirTopR <= 10.0);
  document.getElementById('dirSubLDist').textContent = `${fmt((dirSubL * c) / 1000, 2)} m`;
  document.getElementById('dirSubRDist').textContent = `${fmt((dirSubR * c) / 1000, 2)} m`;
  document.getElementById('dirNote').textContent = dirNoteText;

  const dirInputDelay = document.getElementById('dirInputDelay');
  const dirInputRow = document.getElementById('dirInputRow');
  if (dirInputDelay) {
    dirInputDelay.textContent = state.enableBackline ? `${fmt(backlineDelayMs)} ms` : (state.lang === 'ro' ? 'Bypass (0.0 ms)' : 'Bypassed (0.0 ms)');
  }
  if (dirInputRow) {
    dirInputRow.classList.toggle('bypassed', !state.enableBackline);
  }

  // Speaker Box Values inside Signal Flow SVG Diagram
  const flowTopLVal = document.getElementById('flowTopLVal');
  if (flowTopLVal) flowTopLVal.textContent = `${fmt(dirTopL)} ms`;
  const flowTopRVal = document.getElementById('flowTopRVal');
  if (flowTopRVal) flowTopRVal.textContent = `${fmt(dirTopR)} ms`;
  const flowSubLVal = document.getElementById('flowSubLVal');
  if (flowSubLVal) flowSubLVal.textContent = `${fmt(dirSubL)} ms`;
  const flowSubRVal = document.getElementById('flowSubRVal');
  if (flowSubRVal) flowSubRVal.textContent = `${fmt(dirSubR)} ms`;

  const flowTopLVal_mob = document.getElementById('flowTopLVal_mob');
  if (flowTopLVal_mob) flowTopLVal_mob.textContent = `${fmt(dirTopL)} ms`;
  const flowTopRVal_mob = document.getElementById('flowTopRVal_mob');
  if (flowTopRVal_mob) flowTopRVal_mob.textContent = `${fmt(dirTopR)} ms`;
  const flowSubLVal_mob = document.getElementById('flowSubLVal_mob');
  if (flowSubLVal_mob) flowSubLVal_mob.textContent = `${fmt(dirSubL)} ms`;
  const flowSubRVal_mob = document.getElementById('flowSubRVal_mob');
  if (flowSubRVal_mob) flowSubRVal_mob.textContent = `${fmt(dirSubR)} ms`;

  const badgeEl = document.getElementById('dirBadge');
  if (badgeEl) {
    badgeEl.textContent = dirBadgeText;
    badgeEl.className = dirBadgeClass;
  }

  // ---- Sticky Bar ----
  document.getElementById('stickyStep1').textContent = step1ms < 0.005 ? '0 ms' : `${fmt(step1ms, 1)}ms (${closerSide.replace('SUB ', '')})`;
  document.getElementById('stickyStep2').textContent = `${fmt(step2abs, 1)}ms (${targetSide.replace(' pair', '').replace('Perechea ', '')})`;
}

/* ═══════════════════════════════════════════════════════════════
   INIT SKEUOMORPHIC KNOBS & SWITCHES
   ═══════════════════════════════════════════════════════════════ */
const hpfKnob = new RotaryKnobController(
  'hpf',
  document.getElementById('hpfKnobContainer'),
  document.getElementById('hpfRotor'),
  document.getElementById('hpfTicksSvg'),
  document.getElementById('hpfKnobValue')
);

const xoKnobCtrl = new RotaryKnobController(
  'xo',
  document.getElementById('xoKnobContainer'),
  document.getElementById('xoRotor'),
  document.getElementById('xoTicksSvg'),
  document.getElementById('xoKnobValue')
);

setupVintageSwitch(
  document.getElementById('hpfSwitch'),
  document.getElementById('hpfLabelBW'),
  document.getElementById('hpfLabelLR'),
  'hpf',
  hpfKnob
);

setupVintageSwitch(
  document.getElementById('xoSwitch'),
  document.getElementById('xoLabelBW'),
  document.getElementById('xoLabelLR'),
  'xo',
  xoKnobCtrl
);

// Polarity Inversion Toggle Switch in Direct Values Card
const polSwitchEl = document.getElementById('polSwitch');
const polLabel0 = document.getElementById('polLabel0');
const polLabel180 = document.getElementById('polLabel180');
const polSwitchHint = document.getElementById('polSwitchHint');

if (polSwitchEl) {
  polSwitchEl.addEventListener('click', () => {
    const isTop = polSwitchEl.dataset.pos === 'top';
    polSwitchEl.dataset.pos = isTop ? 'bottom' : 'top';
    polLabel0.classList.toggle('active', !isTop);
    polLabel180.classList.toggle('active', isTop);
    state.allowPolarityInvert = isTop;
    if (polSwitchHint) {
      polSwitchHint.textContent = isTop ? t('pol_allow_180') : t('pol_0_only');
    }
    recalc();
  });
}

// Field Quick Direct Values Nixie / LCD Toggle Button
if (btnNixieMatrixToggle) {
  btnNixieMatrixToggle.addEventListener('click', () => {
    state.matrixNixie = !state.matrixNixie;
    btnNixieMatrixToggle.classList.toggle('active', state.matrixNixie);
    if (nixieToggleText) {
      nixieToggleText.textContent = state.matrixNixie ? 'NIXIE ON' : 'NIXIE OFF';
    }
    try { localStorage.setItem('delcalc_matrix_nixie', state.matrixNixie.toString()); } catch(e){}
    recalc();
  });
}

// Manual Tab 5 Calculation Engine Mode Buttons (Option A vs Option B)
function setCalcMode(mode) {
  if (mode !== 'phase' && mode !== 'gd') mode = 'phase';
  state.calcMode = mode;
  if (btnEnginePhase && btnEngineGD) {
    btnEnginePhase.classList.toggle('active', mode === 'phase');
    btnEngineGD.classList.toggle('active', mode === 'gd');
  }
  if (engineBadge) {
    engineBadge.textContent = mode === 'phase' ? t('engine_badge_phase') : t('engine_badge_gd');
  }
  try { localStorage.setItem('delcalc_calc_mode', mode); } catch(e){}
  recalc();
}

if (btnEnginePhase) {
  btnEnginePhase.addEventListener('click', () => setCalcMode('phase'));
}
if (btnEngineGD) {
  btnEngineGD.addEventListener('click', () => setCalcMode('gd'));
}

// Signal Flow & Delay Routing Fullscreen Toggle
const btnFlowFullscreen = document.getElementById('btnFlowFullscreen');
const flowPanel = document.getElementById('flowPanel');
const flowFsText = document.getElementById('flowFsText');
const flowFsIcon = document.getElementById('flowFsIcon');

function toggleFlowFullscreen() {
  if (!flowPanel) return;
  const isFs = flowPanel.classList.toggle('panel-fullscreen');
  if (flowFsText) {
    flowFsText.textContent = isFs ? t('exit_fullscreen') : t('fullscreen');
  }
  if (flowFsIcon) {
    flowFsIcon.innerHTML = isFs
      ? '<path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>'
      : '<path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 1 0V2h3.5a.5.5 0 0 0 0-1h-4zm10 0a.5.5 0 0 0 0 1H15v3.5a.5.5 0 0 0 1 0v-4a.5.5 0 0 0-.5-.5h-4zM1 10.5a.5.5 0 0 0 0 1H4.5a.5.5 0 0 0 0 1H1a.5.5 0 0 0-.5-.5v-4a.5.5 0 0 0-1 0v4zM14.5 15a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-1 0V14h-3.5a.5.5 0 0 0 0 1h4z"/>';
  }
}

if (btnFlowFullscreen) {
  btnFlowFullscreen.addEventListener('click', toggleFlowFullscreen);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && flowPanel && flowPanel.classList.contains('panel-fullscreen')) {
    toggleFlowFullscreen();
  }
});

/* ═══════════════════════════════════════════════════════════════
   TEXT SIZE SCALING CONTROLLER & LOCALSTORAGE PERSISTENCE
   ═══════════════════════════════════════════════════════════════ */
const TEXT_SCALE_STORAGE_KEY = 'delcalc_text_scale';
let currentTextScale = 1.0; // 1.0 = 100%

function applyTextScale(scale, saveToStorage = true) {
  scale = parseFloat(scale);
  if (isNaN(scale) || scale <= 0) scale = 1.0;
  
  // Support broad range for testing up and down limits
  scale = Math.max(0.50, Math.min(2.50, scale));
  scale = Math.round(scale * 100) / 100;
  currentTextScale = scale;
  
  const pct = Math.round(scale * 100);
  
  // Set CSS Custom Property on documentElement (:root)
  document.documentElement.style.setProperty('--text-scale', scale);
  
  // Update header button label
  const btnTextSizeVal = document.getElementById('btnTextSizeVal');
  if (btnTextSizeVal) btnTextSizeVal.textContent = pct + '%';
  
  // Update modal displays
  const modalSizeDisplay = document.getElementById('modalSizeDisplay');
  if (modalSizeDisplay) modalSizeDisplay.textContent = pct + '%';
  
  const sliderValLabel = document.getElementById('sliderValLabel');
  if (sliderValLabel) sliderValLabel.textContent = pct + '%';
  
  const textSizeSlider = document.getElementById('textSizeSlider');
  if (textSizeSlider) textSizeSlider.value = pct;
  
  // Update active state on preset chips
  document.querySelectorAll('.preset-chip').forEach(chip => {
    const chipScale = parseInt(chip.dataset.scale, 10);
    if (chipScale === pct) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });
  
  // Save to localStorage using modern API
  if (saveToStorage) {
    try {
      localStorage.setItem(TEXT_SCALE_STORAGE_KEY, scale.toString());
    } catch (e) {
      console.warn('Unable to persist text scale to localStorage', e);
    }
  }
}

function initTextScale() {
  let savedScale = 1.0;
  try {
    const val = localStorage.getItem(TEXT_SCALE_STORAGE_KEY);
    if (val !== null) {
      const parsed = parseFloat(val);
      if (!isNaN(parsed) && parsed > 0) savedScale = parsed;
    }
  } catch (e) {
    console.warn('Unable to read text scale from localStorage', e);
  }
  applyTextScale(savedScale, false);
}

function initTextSizeModal() {
  const btnTextSize = document.getElementById('btnTextSize');
  const modal = document.getElementById('textSizeModal');
  const btnClose = document.getElementById('btnCloseTextSize');
  const btnDone = document.getElementById('btnDoneTextSize');
  const slider = document.getElementById('textSizeSlider');
  const btnDec10 = document.getElementById('btnScaleDec10');
  const btnDec5 = document.getElementById('btnScaleDec5');
  const btnReset = document.getElementById('btnScaleReset');
  const btnInc5 = document.getElementById('btnScaleInc5');
  const btnInc10 = document.getElementById('btnScaleInc10');

  function openModal() {
    if (!modal) return;
    modal.style.display = 'flex';
    applyTextScale(currentTextScale, false);
  }

  function closeModal() {
    if (!modal) return;
    modal.style.display = 'none';
  }

  if (btnTextSize) btnTextSize.addEventListener('click', openModal);
  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnDone) btnDone.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display !== 'none') {
      closeModal();
    }
  });

  if (slider) {
    slider.addEventListener('input', (e) => {
      applyTextScale(parseInt(e.target.value, 10) / 100, true);
    });
  }

  if (btnDec10) btnDec10.addEventListener('click', () => applyTextScale(currentTextScale - 0.10, true));
  if (btnDec5) btnDec5.addEventListener('click', () => applyTextScale(currentTextScale - 0.05, true));
  if (btnReset) btnReset.addEventListener('click', () => applyTextScale(1.0, true));
  if (btnInc5) btnInc5.addEventListener('click', () => applyTextScale(currentTextScale + 0.05, true));
  if (btnInc10) btnInc10.addEventListener('click', () => applyTextScale(currentTextScale + 0.10, true));

  document.querySelectorAll('.preset-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const scalePct = parseInt(chip.dataset.scale, 10);
      applyTextScale(scalePct / 100, true);
    });
  });
}

function initManualModal() {
  const btnManual = document.getElementById('btnManual');
  const modal = document.getElementById('manualModal');
  const btnClose = document.getElementById('btnCloseManual');
  const btnDone = document.getElementById('btnDoneManual');
  const tabBtns = document.querySelectorAll('.manual-tab-btn');
  const tabPanes = {
    sub: document.getElementById('manualPaneSub'),
    height: document.getElementById('manualPaneHeight'),
    depth: document.getElementById('manualPaneDepth'),
    backline: document.getElementById('manualPaneBackline'),
    tips: document.getElementById('manualPaneTips')
  };

  function openModal() {
    if (!modal) return;
    modal.style.display = 'flex';
  }

  function closeModal() {
    if (!modal) return;
    modal.style.display = 'none';
  }

  function switchTab(tabKey) {
    tabBtns.forEach(btn => {
      const isActive = btn.dataset.tab === tabKey;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    for (const [key, pane] of Object.entries(tabPanes)) {
      if (pane) {
        pane.classList.toggle('active', key === tabKey);
      }
    }
  }

  if (btnManual) btnManual.addEventListener('click', openModal);
  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnDone) btnDone.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display !== 'none') {
      closeModal();
    }
  });

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  const discLink = document.getElementById('phaseDisclaimerLink');
  if (discLink) {
    const handleDiscLink = (e) => {
      e.preventDefault();
      openModal();
      switchTab('tips');
    };
    discLink.addEventListener('click', handleDiscLink);
    discLink.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') handleDiscLink(e);
    });
  }
}

function initEngineAndMatrixSettings() {
  try {
    const savedMode = localStorage.getItem('delcalc_calc_mode');
    if (savedMode === 'phase' || savedMode === 'gd') {
      state.calcMode = savedMode;
    }
    const savedNixie = localStorage.getItem('delcalc_matrix_nixie');
    if (savedNixie === 'true') {
      state.matrixNixie = true;
      if (btnNixieMatrixToggle) btnNixieMatrixToggle.classList.add('active');
      if (nixieToggleText) nixieToggleText.textContent = 'NIXIE ON';
    }
  } catch (e) {}

  if (btnEnginePhase && btnEngineGD) {
    btnEnginePhase.classList.toggle('active', state.calcMode === 'phase');
    btnEngineGD.classList.toggle('active', state.calcMode === 'gd');
  }
  if (engineBadge) {
    engineBadge.textContent = state.calcMode === 'phase' ? t('engine_badge_phase') : t('engine_badge_gd');
  }
}

function initLanguage() {
  let savedLang = 'en';
  try {
    const val = localStorage.getItem('delcalc_lang');
    if (val === 'ro' || val === 'en') {
      savedLang = val;
    }
  } catch (e) {}
  applyLanguage(savedLang);
}

// Initialize Text Scaling, Modals & Language
initTextScale();
initTextSizeModal();
initManualModal();
initEngineAndMatrixSettings();
initLanguage();

/* ═══════════════════════════════════════════════════════════════
   PWA SERVICE WORKER REGISTRATION (Auto Update)
   ═══════════════════════════════════════════════════════════════ */
if('serviceWorker' in navigator){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(reg => {
      reg.update();
    }).catch(() => {});
  });
}
