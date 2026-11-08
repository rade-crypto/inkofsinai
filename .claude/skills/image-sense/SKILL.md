---
name: image-sense
description: Check that every generated image makes sense for the line it illustrates (gaze, action, who is in frame, what a reach or look points at) before it is used in a video or a prompt is sent. Use when writing image prompts, reviewing generated images, placing images in shots, or when the user asks whether images are good.
---

# Image sense check (Ink of Sinai)

An image is good when a viewer with the sound off can tell what is happening in that moment of the story. A good-looking image that doesn't act out the line fails.

## Check every image, in the shot it is used in

1. **The line:** write down the VO line the image sits under, and the one action it must show (e.g. "Jacob loves Joseph more than his brothers").
2. **Gaze:** where does each person look? Eyes must go to what the story says they care about: another person, an object, the horizon they flee to. Nobody looks into the camera unless they are speaking to the viewer or to an unseen figure in the story (an angel, God, Laban explaining). Posed portraits facing the camera ("both smiling at us") fail.
3. **Action:** the pose acts out the verb of the line (rises against, grabs, feels, sells, kneels). A neutral standing pose under an action line fails.
4. **Pointing at nothing:** a reach, look, rope or arrow that leads out of frame must lead to something the shot shows. In our engine, place the partner image on that side (e.g. Joseph reaching → put Jacob and the boys where he reaches) or crop so the gesture doesn't dangle.
5. **Relations:** two people in a relationship (father and son, brothers in conflict) must relate to each other with body angle, gaze and distance. Two figures standing side by side facing out read as a cast photo, not a scene. Lineups are acceptable only as deliberate name cards (labels under each figure), never for a story beat.
6. **Who is in frame:** only the people the line names (see CLAUDE.md). Count them.
7. **Continuity:** the same person has the same look across shots (hair, beard, age, clothing color); check against the reference image.
8. **House rules:** plain undyed earth-tone clothing, closed necklines, natural bodies, men and women never touch, nothing modern, no Divine Name.

## One use per image

- List every image and the shots it appears in. Any image that comes back after a different shot is a repeat: replace it with an explainer graphic (comparison, tree, chain, timeline, diagram, dots) or an unused image. One continuous scene split into several shots counts as one use.

## What to do with a failure

- **Free fixes first:** mirror (so the gaze faces the partner or the text side), crop, reposition, pair it with another image in the same frame, or use it only where a portrait reading is right.
- **Small problem:** a region edit, not a new image.
- **Real failure** (gaze or action can't be fixed in the edit): list it for regeneration with the reason. Before generating, check the balance, name the model and the credits per image, and get the user's OK (CLAUDE.md). One image per prompt.

## Writing prompts so they pass

- State each person's gaze target and action explicitly: "Jacob, seated, turns his head toward Joseph and looks at him with tender pride; Joseph looks down at the coat in his hands."
- Say "not looking at the viewer" for every story beat.
- Describe the relationship through distance and body angle (turned toward / away, leaning in, backs turned).
- Describe only what should be in frame.

## Report format

One line per image: `image | line it's under | PASS / FIX (free: how) / REGENERATE (why)`.
