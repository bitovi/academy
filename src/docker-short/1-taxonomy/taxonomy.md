@page learn-docker-short/taxonomy Taxonomy
@parent learn-docker-short 1

@description Learn the three core Docker building blocks: the Dockerfile, the image, and the container.

@body

# Taxonomy

Docker has three core building blocks: the Dockerfile, the image, and the container. They're easy to confuse, but the rest of this guide builds on telling them apart, so it's worth getting them straight first.

## Image vs. Container vs. Dockerfile

- **Dockerfile**: a text file of instructions for building an image.
- **Image**: the built, read-only package containing your app plus everything it needs to run. You build it
  once and it never changes.
- **Container**: a running instance of an image. You can run many containers from one image, all
  identical at the start.

The relationship that trips people up: a Dockerfile **builds** an image, and an image **runs** as a
container. Editing your Dockerfile changes nothing until you rebuild, and a rebuild doesn't touch an
already-running container until you start a new one.

### Check your understanding

**Q: You changed your Dockerfile but the running app behaves exactly as before. Why?**

<details>
<summary>Show answer</summary>

A Dockerfile only takes effect when you rebuild the image, and the image only takes effect when you
start a new container. The old container is still running the old image. Rebuild, then re-run.

</details>

**Q: Two containers from the same image. Is the image duplicated?**

<details>
<summary>Show answer</summary>

No. The image is read-only and shared. Each container adds its own thin writable layer on top, so
running ten containers doesn't cost ten copies of the image.

</details>
