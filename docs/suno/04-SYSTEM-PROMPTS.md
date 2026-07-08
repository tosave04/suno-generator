# Bonnes pratiques de prompts pour Suno (IA musicale)

**Résumé exécutif :** Suno est un système avancé de génération musicale par IA. Les résultats dépendent fortement de la formulation du prompt de style (style positif) et de style négatif (exclusions). Les meilleures pratiques consistent à organiser le prompt en éléments clés (genre, tempo, instruments, ambiance, références) dans un ordre prioritaire, à rester concis (≲200 caractères pour le style) et à exploiter le champ « Exclude/Styles to exclude » ou les instructions « no X » pour bannir les éléments indésirables【21†L141-L148】【23†L39-L42】. Les prompt doivent combiner termes musicaux précis (tempo, instrumentations, textures, ambiance) et poids de style (styleWeight) modéré. Des tests empiriques (écoute, spectrogrammes, métriques objectives comme MFCC ou embeddings audio CLAP/MuLan) permettent d’évaluer l’adéquation du résultat au prompt【45†L104-L111】. Ce rapport analyse les conseils officiels et communautaires : structure du prompt, vocabulaire efficace, formatage (crochets, parenthèses, majuscules), style négatif (exclusions), limites (biais culturels, droit d’auteur, artefacts) et propose des modèles de prompt par genre, ainsi qu’un protocole de test et des visualisations (flux Mermaid, spectrogramme).

## Objectifs et méthodologie

L’objectif est d’identifier, compiler et synthétiser les **bonnes pratiques de composition de prompt** pour Suno, en particulier sur les **instructions de style** (éléments à inclure) et de **style négatif** (éléments à exclure). Nous partons de la documentation officielle de Suno (help.suno.com et API), des dépôts officiels, des guides communautaires (blogs, forums) et d’analyses récentes (2024–2026). Les hypothèses incluent l’usage des dernières versions de Suno (v4.5, v5) et l’adaptation aux changements (par ex. prompts plus « conversationnels » acceptés en v4.5【1†L33-L42】). Nous recueillons également des exemples réels de prompts efficaces. Enfin, nous décrivons un protocole de test pratique : choix des paramètres (modèle, styleWeight, vocals), génération multiple, évaluation audio (écoute critique, spectres) et itération du prompt.

## Structure et vocabulaire du prompt de style

Un prompt de style (champ _Style_ dans Suno) doit d’abord **poser le cadre global** (genre/mood) puis décrire les composantes sonores clés. Par exemple : « _Dance-pop énergique, synthés brillants, voix féminine captivante, hook entraînant, 120 BPM, ambiance estivale_ »【41†L79-L87】. Les retours et guides indiquent un ordre prioritaire :

1. **Genre/Subgenre** (ex. _pop, jazz, EDM, orchestral_),
2. **Voix principale** (féminine/masculine/instrumental),
3. **Ambiance/mood** (émotionnel, nostalgique, sombre, festif)【21†L166-L174】【41†L79-L87】,
4. **Instruments clés** (piano, cordes, synthé, percussions spécifiques)【2†L295-L301】,
5. **Tempo/mesure** (BPM, rythme).

Les conseils officiels recommandent d’**utiliser un vocabulaire musical spécifique** : accords (ex. _voicings_, _progression I–V–vi_), instruments (ex. _piano électrique Rhodes_, _guitare acoustique_), effets de production (ex. _reverb légère_, _texture analogique_) et références (ex. _vibe rétro 80s_, _émotion « heartbreak »_)【2†L295-L301】【41†L79-L87】. On évite les noms d’artistes pour des raisons de droits : Suno interdit les références directes (p.ex. « Elvis »)【31†L52-L59】. À la place, on remplace l’artiste par son style (ex. _« crooner 50s »_ pour remémorer Elvis).

La **concision** est cruciale : le prompt de style dépasse rarement 200 caractères【21†L141-L148】. Au-delà, Suno tronque silencieusement la suite【21†L141-L148】. Il est donc conseillé de _concentrer les termes les plus importants au début_【21†L141-L148】. Un ordre efficace souvent cité est : _genre, type de voix, humeur clé, 1–2 instruments principaux, tempo, qualité de production_【21†L164-L171】. Par exemple, « _indie rock, guitare électrique claire, voix masculine éthérée, ambiance mélancolique, 90 BPM, son brut_ ». De tels prompts concis mais descriptifs produisent des chansons plus ciblées.

## Style négatif et exclusions

Le **style négatif** (éléments à exclure) se gère par des instructions explicites. Officiellement, Suno propose dans l’interface la section **« Exclude / Styles to exclude »** (dans les options avancées)【23†L39-L42】. On y entre simplement les éléments non désirés (instruments, effets, genres). Par exemple, « _flûte traversière, chœur, guitare solo_ » pour éviter ces sons. Dans l’API, cela correspond au paramètre `negativeTags` (chaîne listant styles à exclure)【19†L472-L480】. Exemple JSON officiel : `"negativeTags": "Heavy Metal, Drums"`【19†L472-L480】.

En pratique, on peut également formuler le style négatif **dans le prompt principal** en utilisant « _no X_ » ou le préfixe « _NO:_ »【28†L81-L89】【34†L924-L932】. L’usage direct de « no [élément] » fonctionne mieux que des tournures vagues (« avoid », « sans X »)【34†L924-L932】. Par exemple : « _no vocals_, _no electric guitar_, _no chorale_ »【34†L924-L932】. Il est conseillé de limiter les instructions négatives à quelques-unes (idéalement ≤5)【28†L177-L184】【34†L989-L997】. Trop d’exclusions déstabilisent le résultat (mix creux)【34†L989-L997】【28†L179-L186】. Les guides suggèrent aussi de privilégier la **description positive** (« ce que l’on veut ») plutôt que la négation, sauf pour les cas problématiques fréquents【21†L173-L180】【28†L81-L89】. Par exemple, plutôt que _« pas de batterie »_, on précise _« ambiance apaisée, percussions légères »_.

**Syntaxe recommandée pour les négatifs** :

- Préfixe simple « no » ou « NO: » (ex. _no drums, no synth_).
- Un terme par ligne ou séparé par virgule.
- Éviter des phrases longues (« not like X » ne marche pas【34†L930-L938】).

Au final, on combine le prompt positif puis des phrases négatives à la fin :

> \*Reggae groove, basse et rimshots, ambiance chaleureuse, **no electric guitar**, **no saxophone solo\***【34†L943-L951】.

Dans Suno V5+ et V4.5, les négatifs sont interprétés comme **contraintes souples** : ils n’empêchent pas totalement un son, mais le rendent très improbable【34†L1116-L1124】. Si un élément interdit apparaît malgré tout, on peut régénérer ou l’éditer (via l’éditeur de chansons)【34†L1000-L1008】. L’onglet Exclude (avancé) demeure le moyen le plus fiable pour les prompts « simples ».

## Format et balises avancées

Dans la **zone de texte des paroles (Lyrics)**, Suno reconnaît des balises de structure (crochets) et des instructions scéniques (parenthèses ou majuscules)【41†L119-L127】【41†L140-L144】. Par exemple, on peut écrire _« [Verse], [Chorus], [Bridge] »_ pour guider la forme (intro, couplet, refrain, pont)【41†L119-L127】. Ces balises indiquent à Suno où placer les transitions et peuvent améliorer la cohérence. On peut ajouter des cues particuliers : _« [Drop], [Bass Drop], [Chant] »_ selon le contexte【41†L129-L133】. De même, les parenthèses ou mots en majuscule dans les paroles (ex. _(softly)_, _WHISPER_, _BUILD_ ) donnent des indications de timbre ou d’interprétation vocale (ensemble, chœur, intensité). Dans le style (par exemple _« LO-FI AMBIANCE, TESTOSTÉRONÉ »_), les **MAJUSCULES** accentuent l’intensité ou l’urgence【41†L140-L144】. Travis Nicholson note : _« ALL CAPS can increase intensity or emotion »_【41†L142-L144】.

En résumé, on utilise les **balises** suivantes :

- Crochets **[ ]** pour sections musicales (ex. [Intro], [Chorus])【41†L119-L127】.
- Parenthèses **( )** ou majuscules pour nuances de jeu (ex. (whisper), _SLOW_, _BELTED_).
- Tirets ou guillemets pour effets (ex. _- crowd noise -_ pour bruit de foule)【41†L142-L144】.

Ces éléments sont reconnus lors de la génération ; ils n’appartiennent pas directement au prompt « style » mais enrichissent la consigne globale.

## Poids de style et paramètres avancés

Suno propose des contrôles fins : **styleWeight** (pondération du style donné), **weirdnessConstraint** (degré de créativité), **audioWeight** (si on utilise un fichier audio d’entrée). Par défaut ces valeurs sont ~0.65 (65 %)【19†L497-L505】. Un styleWeight faible donnera plus de liberté à l’IA ; un styleWeight élevé la contraint davantage à suivre la consigne. Si l’on ajoute beaucoup de style ou de paroles, on peut ajuster ces poids pour éviter que le résultat dérive. Par exemple, pour un fond musical uniquement instrumentale, on mettra styleWeight élevé et **instrumental=true**. Pour de la voix synthétique, on choisira éventuellement _personaModel: style_persona_ ou _voice_persona_. L’usage de ces paramètres est expliqué dans la doc API Suno【19†L497-L505】. En résumé : moduler styleWeight (0–1) pour contrôler la fidélité au prompt, weirdness pour le niveau d’imprévu, audioWeight si on compose sur un sample existant.

## Longueur optimale du prompt

Le prompt de style doit être court mais riche. _HookGenius_ rappelle que Suno tronque tout au-delà de ≃200 caractères【21†L141-L148】. Cela impose de hiérarchiser ses termes. Par exemple, réduire adjectifs redondants et prépositions inutiles afin de garder l’essentiel au début【21†L141-L148】. Les erreurs courantes sont de répéter les mêmes mots dans le champ Style et Lyrics, ou d’écrire un style trop verbeux. Le fix rapide est de _couper sous 200 caractères_ et de prioriser : genre, mood, 1–2 instruments, bpm, production (voir tableau ci-dessous). Un prompt concis (~100 caractères) bien structuré est souvent plus performant qu’un long texte désordonné【21†L164-L171】. En parallèle, la longueur des **paroles** (lyrics) peut aller jusqu’à ~3000 caractères pour un morceau long, mais on recommande 30–40 lignes (~200–300 mots) pour 3–4 minutes de chanson【21†L148-L155】.

## Exemples comparatifs de prompts

| Prompt initial (Style)                          | Variation / négatifs ajoutés                                           | Effet attendu                                                           |
| ----------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| _“Cinématique orchestral, cordes chaleureuses”_ | _“… instrumental uniquement, **no vocals, no choir**”_【34†L959-L962】 | Passage purement instrumental ; élimination de tout choeur/voix.        |
| _“Lo-fi hip hop doux, piano, BPM 80”_           | _“… ambiance nocturne, **no synth pads**”_【34†L963-L966】             | Son plus organique, suppression des nappes synthétiques artificielles.  |
| _“Anthem pop rock, guitares rythmées”_          | _“… voix féminine claire, **no guitar solo**”_【34†L967-L969】         | Conserve la guitare, supprime les envolées solo pour focaliser mélodie. |
| _“Dance-pop, beats entraînants”_                | _“… voix claire, **no autotune**”_                                     | Voix plus naturelle, suppression de la correction vocale « radio ».     |

Ces exemples fictifs illustrent l’impact d’un style négatif. Par ex. Jack Righteous recommande le modèle « STYLE + MOOD + instruments clés, NO: … »【34†L943-L951】. Dans la table ci-dessus, la colonne _Effet attendu_ est déduite des conseils (ex. éliminer réverbérations/basse synthétique)【28†L81-L89】【34†L989-L997】. Pour chaque genre, on pourra construire des paires similaires (voir modèles de prompt suivants).

## Modèles de prompt prêts à l’emploi

Voici des **templates de prompts** pour illustrer différents objectifs musicaux. Ces formules combinent genre, instruments et ambiance, auxquelles on peut ajouter des exclusions selon le besoin.

- **Pop entraînant :** _“Dance-pop moderne, production brillante, voix féminine puissante, refrain accrocheur, BPM 120, énergie estivale”_【41†L153-L162】. (Optionnel : _no autotune, no guitare folk_ pour un son plus pur.)
- **Ambiant relaxant :** _“Ambient smooth, nappes synthétiques légères, textures éthérées, piano rêveur, atmosphère nocturne apaisante, faible tempo”_ (ajouter _no drums, no percussions_ pour intensité minimale).
- **Orchestral cinématique :** _“Orchestral score, cordes imposantes, cuivres dramatiques, crescendo émotionnel, ambiance épique”_【41†L187-L194】. (_No pop-synth, no beat_ pour authenticité classique.)
- **Lo-fi hip-hop :** _“Lo-fi hip hop beat, piano délicat, crackle de vinyle, basse chaude, 75 BPM, ambiance étude cosy”_【28†L73-L81】. (Astuce : _no synth pads, no reverb-heavy mix_ pour un rendu plus vintage.)
- **Voix synthétique :** _“R&B contemporain, voix synthétique féminine, mélodie suave, groove smooth, ambiance néo-soul”_. (Ajouter _no acoustic guitar_ si l’on veut le focaliser sur l’aspect électrique.)

Ces modèles s’inspirent des suggestions trouvées (ex. promesses de Travis Nicholson【41†L179-L187】【41†L187-L194】) et de pratiques confirmées. Ils peuvent servir de point de départ modifiable.

## Recommandations pratiques (étapes)

1. **Définir l’objectif musical** (genre, mood, instruments, tempo). Rédigez un prompt clair dans _Style_, en juxtaposant les mots-clés (utilisez des virgules pour séparer).
2. **Choisir la version Suno** (préférence V5 ou V4.5 pour prompts riches) et configurer _Custom Mode_ selon besoin (instrumental ou pas).
3. **Ajouter les détails** (genre principal, ambiance, instruments, BPM). Par exemple : _“RnB lounge, chant féminin doux, piano jazzy, basse souple, 90 BPM”_.
4. **Ajouter des exclusions** soit via l’onglet Exclude, soit dans le prompt : _no [élément]_. Énumérez uniquement les éléments gênants (ex. _« no reverb, no choir »_)【34†L924-L932】.
5. **Conserver la concision** : visez <200 caractères pour que Suno lise l’ensemble【21†L141-L148】. Supprimez adjectifs superflus en fin de phrase si besoin. Priorisez les termes les plus importants au début.
6. **Générer plusieurs versions** : les petites variantes de seed peuvent donner des résultats très différents【41†L98-L100】.
7. **Évaluer et itérer** : écoutez plusieurs sorties et modifiez le prompt. Utilisez les icônes 👍/👎 de Suno pour indiquer vos préférences (cela aide le système à mieux apprendre vos goûts). Si l’aspect musical n’est pas conforme, retouchez le prompt (ajustez négatifs ou précisez un instrument plus clairement) et régénérez.

Un diagramme de ce workflow d’itération est présenté ci-dessous (fig. 1).

```mermaid
flowchart LR
  A[Définir objectif musical] --> B[Composer prompt initial de style (genre, mood, instruments, BPM)]
  B --> C[Paramétrer modèle (version, poids du style, vocals)]
  C --> D[Générer plusieurs pistes audio]
  D --> E[Évaluation : écoute critique & mesures objectives]
  E --> F{Correction nécessaire ?}
  F -- Oui --> B
  F -- Non --> G[Finaliser / exporter la chanson]
```

## Protocoles de test et métriques

Pour valider empiriquement les prompts, on suivra un protocole structuré. **Paramètres fixes** : choisir le modèle (ex. V5), la durée, _styleWeight_, _weirdness_, etc. Définir un prompt de référence et quelques variations (avec/ sans négatifs, poids différents). **Génération** : lancer plusieurs seeds par prompt. **Évaluation perceptuelle** : réaliser des audits d’écoute (par ex. test comparatif MUSHRA ou évaluations par un panel de musiciens) pour juger qualité globale, adhérence au style et présence d’artefacts. **Analyse spectrale** : exporter les fichiers audio et extraire spectrogrammes, log-melspectrogrammes ou coef. MFCC【45†L104-L111】. La comparaison peut passer par des distances objectives (e.g. distance euclidienne entre mélodies spectrales) ou des modèles d’embedding audio Texte-Audio (CLAP, MuLan) pour mesurer la similarité au prompt textuel【45†L104-L111】.

Par exemple, on pourra visualiser le spectrogramme d’un extrait :

【55†embed_image】 _Ex. forme d’onde (spectrogramme) d’un morceau généré, montrant la répartition fréquentielle et temporelle du signal._

Les outils recommandés incluent des bibliothèques Python (Librosa pour spectrogrammes/MFCC, Essentia), ainsi que des API comme [CLAP](https://github.com/OpenAILabs/clap) ou [MuLan](https://github.com/facebookresearch/mulan) pour évaluer la distance entre l’audio généré et la consigne textuelle. Une métrique « de style » interne, proposée par Suno (Fréchet Audio Distance, FAD) pourrait être utilisée pour quantifier la qualité sonore globale.

Enfin, un test systématique est de **comparer le prompt original et modifié** : on vérifie si l’ajout d’exclusions (ou de mots-clés) produit bien les effets attendus. Par exemple, un prompt « no guitar solo » devrait réduire la présence de solos (écoute + spectre). Si l’output diverge des consignes, on affine le prompt ou on utilise l’éditeur de piste Suno.

## Limites et risques

- **Biais culturels:** Les données d’entraînement de Suno sont majoritairement occidentales. Mehta et al. (2025) montrent que seuls ~5,7 % des morceaux d’entraînement sont de cultures non-occidentales【60†L628-L636】. Les modèles tendent donc à favoriser les styles majoritaires (pop, rock occidentaux). Pour les genres « low-resource » (musique traditionnelle, non-12-TET, etc.), Suno peut générer des résultats inattendus. En promotion des prompts, on reste conscient de ce biais implicite【60†L628-L636】【60†L729-L737】.
- **Droits d’auteur et contenu protégé:** Suno interdit les prompts mentionnant directement des œuvres ou artistes sous copyright. Par exemple, il faut éviter « chanter comme [Artiste célèbre] »【31†L52-L59】. Les résultats peuvent néanmoins ressembler à des styles connus – utiliser ces créations avec prudence commerciale.
- **Artefacts audio:** Les sorties IA peuvent contenir des anomalies (échos étranges, coupures de voix, réverbérations excessives). Un prompt négatif trop restrictif peut aboutir à un mix déséquilibré (manque d’instruments). Il faut donc tester et ajuster minutieusement.
- **Sensibilité des métriques:** Les mesures objectives ne capturent pas toujours la qualité perçue (comme le soulignent les études sur l’évaluation musicale【45†L44-L53】). Les écoutes humaines restent essentielles.

En résumé, le contrôle par prompt est puissant mais non infaillible : c’est un cadre de direction créative, nécessitant souvent itération et post-traitement (éditeur de morceau, stems) pour polir le résultat final.

## Sources

Les recommandations ci-dessus s’appuient sur la **documentation officielle Suno** (help.suno.com, docs.sunoapi.org)【1†L33-L42】【19†L472-L480】, sur des guides techniques récents et sur des analyses communautaires (medium.com, blogs, forums)【21†L141-L148】【34†L924-L932】【41†L119-L127】【28†L81-L89】. Toutes les citations en ligne sont indiquées ci-dessus.
