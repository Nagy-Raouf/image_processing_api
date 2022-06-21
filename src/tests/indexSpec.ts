import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Endpoint Server Test', (): void => {
  it('Gets Welcome Page', async (): Promise<void> => {
    //Act
    const response = await request.get('/');

    //Validate
    expect(response.text).toContain('Welcome to image processing api');
    expect(response.status).toBe(200);
  });

  it('Gets undefined path (404)', async (): Promise<void> => {
    //Act
    const response = await request.get('/Udacity');

    //Validate
    expect(response.text).toContain('Page is not found');
    expect(response.status).toBe(404);
  });

  it('Gets Full Image', async (): Promise<void> => {
    //Act
    const response = await request.get('/api/image?imagename=fjord');

    //Validate
    expect(response.status).toBe(200);
  });

  it('Gets Resized Image using valid width and height', async (): Promise<void> => {
    //Act
    const response = await request.get(
      '/api/image?imagename=santamonica&width=500&height=500'
    );

    //Validate
    expect(response.status).toBe(200);
  });

  it('Gets Resize Image without specifying image name', async (): Promise<void> => {
    //Act
    const response = await request.get('/api/image?width=500&height=500');

    //Validate
    expect(response.text).toContain(
      'Please provide the name of the image to be displayed'
    );
    expect(response.status).toBe(404);
  });

  it('Gets Resize Image specifying wrong image name', async (): Promise<void> => {
    //Act
    const response = await request.get(
      '/api/image?imagename=test&width=500&height=500'
    );

    //Validate
    expect(response.text).toContain('No image found with that name');
    expect(response.status).toBe(404);
  });

  it('Gets Resize Image without specifying width', async (): Promise<void> => {
    //Act
    const response = await request.get('/api/image?imagename=fjord&height=500');

    //Validate
    expect(response.text).toContain('Please provide both param');
    expect(response.status).toBe(404);
  });

  it('Gets Resize Image without specifying height', async (): Promise<void> => {
    //Act
    const response = await request.get('/api/image?imagename=fjord&width=500');

    //Validate
    expect(response.text).toContain('Please provide both param');
    expect(response.status).toBe(404);
  });

  it('Gets Resize Image specifying negative height', async (): Promise<void> => {
    //Act
    const response = await request.get(
      '/api/image?imagename=santamonica&width=500&height=-500'
    );

    //Validate
    expect(response.text).toContain('Please provide valid param');
    expect(response.status).toBe(404);
  });

  it('Gets Resize Image specifying negative height', async (): Promise<void> => {
    //Act
    const response = await request.get(
      '/api/image?imagename=santamonica&width=-500&height=500'
    );

    //Validate
    expect(response.text).toContain('Please provide valid param');
    expect(response.status).toBe(404);
  });
});
