import express from 'express';
import {
    Florence2ForConditionalGeneration,
    AutoProcessor,
    AutoTokenizer,
    RawImage,
} from '@xenova/transformers';

const router = express.Router();

router.post('/generate-ocr-withurl', async (req, res) => {
    try {
        console.log('started');
// Load model, processor, and tokenizer
const model_id = 'onnx-community/Florence-2-base-ft';
const model = await Florence2ForConditionalGeneration.from_pretrained(model_id, { dtype: 'fp32' });
const processor = await AutoProcessor.from_pretrained(model_id);
const tokenizer = await AutoTokenizer.from_pretrained(model_id);

console.log('loading image');
// Load image and prepare vision inputs
const {url} = req.body;

console.log('URL : ', req.body);
const image = await RawImage.fromURL(url);
const vision_inputs = await processor(image);

console.log('reading task');
// Specify task and prepare text inputs
//Tasks : <CAPTION> , <DETAILED_CAPTION> , <MORE_DETAILED_CAPTION> ,<OCR> , <OCR_WITH_REGION> etc
const task = '<OCR>'
const prompts = processor.construct_prompts(task);
const text_inputs = tokenizer(prompts);

console.log('Generating');
// Generate text
const generated_ids = await model.generate({
    ...text_inputs,
    ...vision_inputs,
    max_new_tokens: 100,
});

// Decode generated text
const generated_text = tokenizer.batch_decode(generated_ids, { skip_special_tokens: false })[0];

// Post-process the generated text
const result = processor.post_process_generation(generated_text, task, image.size);
console.log(result);
        
        res.json({ description: result });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate description' });
    }
});

export default router;
