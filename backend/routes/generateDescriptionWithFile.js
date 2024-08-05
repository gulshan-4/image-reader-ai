import express from 'express';
import multer from 'multer';
import {
    Florence2ForConditionalGeneration,
    AutoProcessor,
    AutoTokenizer,
    RawImage,
} from '@xenova/transformers';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) || '.jpg';
        cb(null, Date.now() + ext); // Save with original extension or .jpg
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/generate-description-withfile', upload.single('file'), async (req, res) => {
    try {
        console.log('started');

        // Load model, processor, and tokenizer
        const model_id = 'onnx-community/Florence-2-base-ft';
        const model = await Florence2ForConditionalGeneration.from_pretrained(model_id, { dtype: 'fp32' });
        const processor = await AutoProcessor.from_pretrained(model_id);
        const tokenizer = await AutoTokenizer.from_pretrained(model_id);

        console.log('loading image');

        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'Invalid file or No file, try again with image file' });
        }

        // Load image from the file
        const filePath = path.join('uploads', req.file.filename);
        console.log('filepath :', filePath);

        const image = await RawImage.fromURL(filePath);
        const vision_inputs = await processor(image);

        console.log('reading task');
        // Specify task and prepare text inputs
        const task = '<MORE_DETAILED_CAPTION>';
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

        // Clean up uploaded file
        fs.unlinkSync(filePath);

        res.json({ description: result });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate description' });
    }
});

export default router;